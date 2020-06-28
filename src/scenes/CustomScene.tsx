import React, { useEffect, createRef } from 'react'
import * as THREE from 'three'
import { css } from '@emotion/core'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'

const vert = `
varying vec2 vUv;
void main() {
  vUv = uv;
  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  gl_Position = projectionMatrix * mvPosition;
}
`

const frag = `
uniform float time;
varying vec2 vUv;
void main( void ) {
  vec2 position = - 1.0 + 2.0 * vUv;
  float red = abs( sin( position.x * position.y + time / 5.0 ) );
  float green = abs( sin( position.x * position.y + time / 4.0 ) );
  float blue = abs( sin( position.x * position.y + time / 3.0 ) );
  gl_FragColor = vec4( red, green, blue, 1.0 );
}
`

const newScene = () => {
  const scene = new THREE.Scene()
  return scene
}

const newCamera = () => {
  const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 3000)
  camera.position.z = 4
  return camera
}

const newRenderer = (mount: React.RefObject<HTMLInputElement>) => {
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.autoClear = true
  if (mount.current) {
    mount.current.appendChild(renderer.domElement)
  }
  return renderer
}

const CustomScene = () => {
  const mount = createRef<HTMLInputElement>()
  useEffect(() => {
    // scene
    const scene = newScene()

    // camera
    const camera = newCamera()

    // renderer
    const renderer = newRenderer(mount)

    // clock
    const clock = new THREE.Clock()

    // mesh
    const geometry = new THREE.BoxBufferGeometry(0.75, 0.75, 0.75)
    const uniforms = {
      time: { value: 1.0 }
    }
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vert,
      fragmentShader: frag
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = 0
    mesh.position.y = 0
    scene.add(mesh)

    // post processing
    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))
    const glitchPass = new GlitchPass()
    composer.addPass(glitchPass)

    // render
    const render = () => {
      const delta = clock.getDelta()
      uniforms.time.value += delta * 5
      mesh.rotation.x += delta * 0.5
      mesh.rotation.y += delta * 0.5
      renderer.render(scene, camera)
    }

    // animation
    const animate = () => {
      requestAnimationFrame(animate)
      render()
      composer.render()
    }
    animate()
  }, [])
  return (
    <>
      <div className="absolute z-10 w-full h-full">
        <div className="flex justify-center mt-32">
          <span className="font-serif text-white text-4xl">Three.js × Gatsby Template</span>
        </div>
      </div>
      <div ref={mount} />
    </>
  )
}
export default CustomScene
