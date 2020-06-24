import React, { useEffect, createRef } from 'react'
import * as THREE from 'three'
import { css } from '@emotion/core'

const newScene = () => {
  const scene = new THREE.Scene()
  return scene
}

const newCamera = () => {
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 400
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

const BaseScene = () => {
  const mount = createRef<HTMLInputElement>()
  useEffect(() => {
    // scene
    const scene = newScene()

    // camera
    const camera = newCamera()

    // renderer
    const renderer = newRenderer(mount)

    const geometry = new THREE.BoxGeometry(20, 20, 20)
    const material = new THREE.MeshNormalMaterial()
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const render = () => {
      renderer.render(scene, camera)
    }
    const animate = () => {
      requestAnimationFrame(animate)
      render()
    }
    animate()
  }, [])
  return (
    <>
      <div css={css``} ref={mount} />
    </>
  )
}
export default BaseScene
