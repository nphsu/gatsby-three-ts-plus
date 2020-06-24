import React, { useEffect, createRef } from 'react'
import * as THREE from 'three'
import { css } from '@emotion/core'

// https://threejs.org/examples/?q=vr#webxr_vr_ballshooter
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
