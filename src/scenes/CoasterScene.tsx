import React, { useEffect, createRef } from 'react'
import * as THREE from 'three'
import { css } from '@emotion/core'
import {
  RollerCoasterGeometry,
  RollerCoasterShadowGeometry,
  RollerCoasterLiftersGeometry,
  TreesGeometry,
  SkyGeometry
} from 'three/examples/jsm/misc/RollerCoaster.js'
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js'

const newScene = () => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x160664)
  return scene
}

const newCamera = () => {
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 500)

  return camera
}

const newRenderer = (mount: React.RefObject<HTMLInputElement>) => {
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.xr.enabled = true
  renderer.xr.setReferenceSpaceType('local')
  if (mount.current) {
    mount.current.appendChild(renderer.domElement)
    mount.current.appendChild(VRButton.createButton(renderer))
  }
  return renderer
}

const newSky = () => {
  const geometry = new SkyGeometry()
  const material = new THREE.MeshBasicMaterial({ color: 0x000000 })
  const mesh = new THREE.Mesh(geometry, material)
  return mesh
}

const newCurve = () => {
  const PI2 = Math.PI * 2

  const curve = (() => {
    const vector = new THREE.Vector3()
    const vector2 = new THREE.Vector3()

    return {
      getPointAt(t) {
        t *= PI2

        const x = Math.sin(t * 3) * Math.cos(t * 4) * 50
        const y = Math.sin(t * 10) * 2 + Math.cos(t * 17) * 2 + 5
        const z = Math.sin(t) * Math.sin(t * 4) * 50

        return vector.set(x, y, z).multiplyScalar(2)
      },

      getTangentAt(t) {
        const delta = 0.0001
        const t1 = Math.max(0, t - delta)
        const t2 = Math.min(1, t + delta)

        return vector2
          .copy(this.getPointAt(t2))
          .sub(this.getPointAt(t1))
          .normalize()
      }
    }
  })()
  return curve
}

const newCorster = curve => {
  const geometry = new RollerCoasterGeometry(curve, 1500)
  const material = new THREE.MeshPhongMaterial({
    vertexColors: true,
    color: new THREE.Color(0xf2d600)
  })
  const mesh = new THREE.Mesh(geometry, material)
  return mesh
}

const newLifters = curve => {
  const geometry = new RollerCoasterLiftersGeometry(curve, 100)
  const material = new THREE.MeshPhongMaterial()
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.y = 0.1
  return mesh
}

const newShadow = curve => {
  const geometry = new RollerCoasterShadowGeometry(curve, 500)
  const material = new THREE.MeshBasicMaterial({
    color: 0xf2d600,
    depthWrite: false,
    transparent: true
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.y = 0.1
  return mesh
}

const newCylinderA = () => {
  const geometry = new THREE.CylinderBufferGeometry(10, 10, 5, 15)
  const material = new THREE.MeshLambertMaterial({
    color: 0xff8080
    // flatShading: true // Lambert does not support flat shading
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(-80, 10, -70)
  mesh.rotation.x = Math.PI / 2
  return mesh
}

const newCylinderB = () => {
  const geometry = new THREE.CylinderBufferGeometry(5, 6, 4, 10)
  const material = new THREE.MeshLambertMaterial({
    color: 0x8080ff
    // flatShading: true // Lambert does not support flat shading
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(50, 2, 30)
  return mesh
}

// https://threejs.org/examples/?q=vr#webxr_vr_ballshooter
const CoasterScene = () => {
  const mount = createRef<HTMLInputElement>()
  const clock = new THREE.Clock()

  useEffect(() => {
    const scene = newScene()
    const camera = newCamera()
    const renderer = newRenderer(mount)

    const light = new THREE.HemisphereLight(0xfff0f0, 0x606066)
    light.position.set(1, 1, 1)
    scene.add(light)

    const train = new THREE.Object3D()
    scene.add(train)
    train.add(camera)

    const geometry = new THREE.PlaneBufferGeometry(500, 500, 15, 15)
    geometry.rotateX(-Math.PI / 2)

    const positions = geometry.attributes.position.array
    const vertex = new THREE.Vector3()

    for (let i = 0; i < positions.length; i += 3) {
      vertex.fromArray(positions, i)

      vertex.x += Math.random() * 10 - 5
      vertex.z += Math.random() * 10 - 5

      const distance = vertex.distanceTo(scene.position) / 5 - 25
      vertex.y = Math.random() * Math.max(0, distance)

      vertex.toArray(positions, i)
    }

    geometry.computeVertexNormals()

    const material = new THREE.MeshLambertMaterial({
      color: 0x000000
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const treeGeometry = new TreesGeometry(mesh)
    const treeMmaterial = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      vertexColors: true,
      color: 0x013e23
    })
    const tree = new THREE.Mesh(treeGeometry, treeMmaterial)
    scene.add(tree)

    const sky = newSky()
    scene.add(sky)

    const curve = newCurve()
    const corster = newCorster(curve)
    scene.add(corster)

    const lifters = newLifters(curve)
    scene.add(lifters)

    const shadow = newShadow(curve)
    scene.add(shadow)

    const cylinderA = newCylinderA()
    scene.add(cylinderA)

    const cylinderB = newCylinderB()
    scene.add(cylinderB)

    const funfairs = []
    funfairs.push(cylinderA)
    funfairs.push(cylinderB)

    const position = new THREE.Vector3()
    const tangent = new THREE.Vector3()

    const lookAt = new THREE.Vector3()

    let velocity = 0
    let progress = 0

    let prevTime = performance.now()

    const render = () => {
      const time = performance.now()
      const delta = time - prevTime

      for (let i = 0; i < funfairs.length; i++) {
        funfairs[i].rotation.y = time * 0.0004
      }

      //

      progress += velocity
      progress %= 1

      position.copy(curve.getPointAt(progress))
      position.y += 0.3

      train.position.copy(position)

      tangent.copy(curve.getTangentAt(progress))

      velocity -= tangent.y * 0.0000001 * delta
      velocity = Math.max(0.00004, Math.min(0.0002, velocity))

      train.lookAt(lookAt.copy(position).sub(tangent))

      //

      renderer.render(scene, camera)

      prevTime = time
    }

    renderer.setAnimationLoop(render)
  }, [])

  return (
    <>
      <div className="absolute z-10 w-full h-full">
        <div className="flex justify-center mt-32">
          <span className="font-serif text-gray-600 text-4xl">This is text message.</span>
        </div>
        <div className="border-solid border border-gray-600 mx-8 lg:max-w-3xl lg:mx-auto" />
        <div className="flex justify-center mt-10">
          <span className="font-serif font-bold text-gray-600 lg:text-2xl">no matter who you are</span>
        </div>
        <div className="flex justify-center mt-4">
          <span className="font-serif font-bold text-gray-600 lg:text-2xl">no matter how old you are</span>
        </div>
        <div className="flex justify-center mt-4">
          <span className="font-serif font-bold text-gray-600 lg:text-2xl">no matter what you do</span>
        </div>
        <div className="flex justify-center mt-12">
          <span className="font-serif font-bold text-gray-600 lg:text-2xl">There is a way you go</span>
        </div>
      </div>
      <div css={css``} ref={mount} />
    </>
  )
}

export default CoasterScene
