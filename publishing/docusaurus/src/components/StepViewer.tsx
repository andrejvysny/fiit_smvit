import React, {useEffect, useRef, useState} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useBaseUrl from '@docusaurus/useBaseUrl';

type Props = {src: string; height?: number};

type OcctMesh = {
  attributes: {position: {array: number[]}; normal?: {array: number[]}};
  index: {array: number[]};
  color?: [number, number, number];
};
type OcctApi = {ReadStepFile(buf: Uint8Array, params: null): {success: boolean; meshes: OcctMesh[]}};
type OcctFactory = (opts: {locateFile: (f: string) => string}) => Promise<OcctApi>;

function loadScript(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as unknown as {occtimportjs?: OcctFactory}).occtimportjs) return resolve();
    const s = document.createElement('script');
    s.src = url;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Failed to load OCCT script'));
    document.head.appendChild(s);
  });
}

function Viewer({src, height = 520}: Props) {
  const mount = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState('Loading CAD kernel…');
  const modelUrl = useBaseUrl(src);
  const occtJs = useBaseUrl('/occt/occt-import-js.js');
  const occtWasm = useBaseUrl('/occt/occt-import-js.wasm');

  useEffect(() => {
    const el = mount.current;
    if (!el) return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      try {
        const [THREE, {OrbitControls}] = await Promise.all([
          import('three'),
          import('three/examples/jsm/controls/OrbitControls.js'),
        ]);
        await loadScript(occtJs);
        const occt = await (window as unknown as {occtimportjs: OcctFactory}).occtimportjs({
          locateFile: () => occtWasm,
        });
        setStatus('Downloading model…');
        const buf = new Uint8Array(await (await fetch(modelUrl)).arrayBuffer());
        setStatus('Converting STEP → mesh…');
        const result = occt.ReadStepFile(buf, null);
        if (disposed) return;
        if (!result.success) throw new Error('STEP parse failed');

        const dark = document.documentElement.dataset.theme === 'dark';
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(dark ? 0x1b1b1d : 0xf3f4f6);
        const group = new THREE.Group();
        for (const m of result.meshes) {
          const g = new THREE.BufferGeometry();
          g.setAttribute('position', new THREE.Float32BufferAttribute(m.attributes.position.array, 3));
          if (m.attributes.normal) {
            g.setAttribute('normal', new THREE.Float32BufferAttribute(m.attributes.normal.array, 3));
          } else {
            g.computeVertexNormals();
          }
          g.setIndex(m.index.array);
          const c = m.color ? new THREE.Color(m.color[0], m.color[1], m.color[2]) : new THREE.Color(0x8a9199);
          group.add(new THREE.Mesh(g, new THREE.MeshStandardMaterial({color: c, metalness: 0.1, roughness: 0.7})));
        }
        scene.add(group);

        const box = new THREE.Box3().setFromObject(group);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3()).length();

        scene.add(new THREE.HemisphereLight(0xffffff, 0x555566, 1.2));
        const dir = new THREE.DirectionalLight(0xffffff, 1.6);
        dir.position.copy(center).add(new THREE.Vector3(size, size, size));
        scene.add(dir);

        const camera = new THREE.PerspectiveCamera(45, 1, size / 1000, size * 20);
        camera.position.copy(center).add(new THREE.Vector3(size * 0.8, size * 0.6, size * 0.8));
        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        el.appendChild(renderer.domElement);
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.target.copy(center);
        controls.update();

        const resize = () => {
          const w = el.clientWidth;
          renderer.setSize(w, height);
          camera.aspect = w / height;
          camera.updateProjectionMatrix();
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(el);

        let raf = 0;
        const loop = () => {
          raf = requestAnimationFrame(loop);
          renderer.render(scene, camera);
        };
        loop();
        setStatus('');

        cleanup = () => {
          cancelAnimationFrame(raf);
          ro.disconnect();
          controls.dispose();
          renderer.dispose();
          group.traverse((o) => {
            if (o instanceof THREE.Mesh) {
              o.geometry.dispose();
              (o.material as import("three").Material).dispose();
            }
          });
          renderer.domElement.remove();
        };
      } catch (e) {
        setStatus(`3D preview unavailable: ${(e as Error).message}`);
      }
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [modelUrl, occtJs, occtWasm, height]);

  return (
    <div style={{position: 'relative', minHeight: height, borderRadius: 8, overflow: 'hidden'}}>
      <div ref={mount} />
      {status && (
        <div style={{position: 'absolute', inset: 0, display: 'grid', placeItems: 'center'}}>{status}</div>
      )}
    </div>
  );
}

export default function StepViewer(props: Props) {
  return <BrowserOnly fallback={<div>Loading 3D preview…</div>}>{() => <Viewer {...props} />}</BrowserOnly>;
}
