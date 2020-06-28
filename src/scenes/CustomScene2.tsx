import React, { useEffect, createRef } from 'react'
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'

const MALE_OBJ_PATH = './models/male02.obj'
const FEMALE_OBJ_PATH = './models/female02.obj'

const newScene = () => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000104)
  scene.fog = new THREE.FogExp2(0x000104, 0.0000675)
  return scene
}

const newCamera = () => {
  const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 50000)
  camera.position.set(0, 700, 7000)
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

const combineBuffer = (model: THREE.Group, bufferName: string) => {
  let count = 0
  model.traverse((child: THREE.Object3D) => {
    if (child.type === 'Mesh') {
      const buffer = (child as THREE.Mesh).geometry.attributes[bufferName]
      count += buffer.array.length
    }
  })

  const combined = new Float32Array(count)

  let offset = 0
  model.traverse((child: THREE.Object3D) => {
    if (child.type === 'Mesh') {
      const buffer = (child as THREE.Mesh).geometry.attributes[bufferName]
      combined.set(buffer.array, offset)
      offset += buffer.array.length
    }
  })

  return new THREE.BufferAttribute(combined, 3)
}

const createBufferGeometry = (positions: THREE.BufferAttribute) => {
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', positions.clone())
  geometry.setAttribute('initialPosition', positions.clone())
  geometry.attributes.position.setUsage(THREE.DynamicDrawUsage)
  return geometry
}

const createMesh = (
  parent: THREE.Object3D,
  meshes: any[],
  clonemeshes: any[],
  positions: THREE.BufferAttribute,
  scale: number,
  x: number,
  y: number,
  z: number,
  color: THREE.Color
) => {
  const geometry = createBufferGeometry(positions)
  const clones = [
    [6000, 0, -4000],
    [5000, 0, 0],
    [1000, 0, 5000],
    [1000, 0, -5000],
    [4000, 0, 2000],
    [-4000, 0, 1000],
    [-5000, 0, -5000],
    [0, 0, 0]
  ]
  let mesh: any
  for (let i = 0; i < clones.length; i++) {
    const c = i < clones.length - 1 ? 0x252525 : color

    mesh = new THREE.Points(geometry, new THREE.PointsMaterial({ size: 30, color: c }))
    mesh.scale.x = scale
    mesh.scale.y = scale
    mesh.scale.z = scale
    mesh.position.x = x + clones[i][0]
    mesh.position.y = y + clones[i][1]
    mesh.position.z = z + clones[i][2]

    meshes.push({
      mesh,
      verticesDown: 0,
      verticesUp: 0,
      direction: 0,
      speed: 5,
      delay: Math.floor(200 + 200 * Math.random()),
      start: Math.floor(100 + 200 * Math.random())
    })
    clonemeshes.push({ mesh, speed: 0.5 + Math.random() })
    parent.add(mesh)
  }
}

const CustomScene2 = () => {
  const mount = createRef<HTMLInputElement>()

  useEffect(() => {
    // scene
    const scene = newScene()

    // camera
    const camera = newCamera()
    camera.lookAt(scene.position)

    // renderer
    const renderer = newRenderer(mount)

    // clock
    const clock = new THREE.Clock()

    // parent object
    const parent = new THREE.Object3D()
    scene.add(parent)

    // clone meshes
    const meshes: any[] = []
    const clonemeshes: any[] = []

    // grid ground
    const grid = new THREE.Points(
      new THREE.PlaneBufferGeometry(15000, 15000, 64, 64),
      new THREE.PointsMaterial({ color: 0xff0000, size: 10 })
    )
    grid.position.y = -400
    grid.rotation.x = -Math.PI / 2
    parent.add(grid)

    // OBJ loader
    const loader = new OBJLoader()
    loader.load(MALE_OBJ_PATH, (object: THREE.Group) => {
      const positions = combineBuffer(object, 'position')
      createMesh(parent, meshes, clonemeshes, positions, 4.05, -500, -350, 600, new THREE.Color(0xff7744))
      createMesh(parent, meshes, clonemeshes, positions, 4.05, 500, -350, 0, new THREE.Color(0xff5522))
      createMesh(parent, meshes, clonemeshes, positions, 4.05, -250, -350, 1500, new THREE.Color(0xff9922))
      createMesh(parent, meshes, clonemeshes, positions, 4.05, -250, -350, -1500, new THREE.Color(0xff99ff))
    })
    loader.load(FEMALE_OBJ_PATH, (object: THREE.Group) => {
      const positions = combineBuffer(object, 'position')
      createMesh(parent, meshes, clonemeshes, positions, 4.05, -1000, -350, 0, new THREE.Color(0xffdd44))
      createMesh(parent, meshes, clonemeshes, positions, 4.05, 0, -350, 0, new THREE.Color(0xffffff))
      createMesh(parent, meshes, clonemeshes, positions, 4.05, 1000, -350, 400, new THREE.Color(0xff4422))
      createMesh(parent, meshes, clonemeshes, positions, 4.05, 250, -350, 1500, new THREE.Color(0xff9955))
    })

    // render
    const render = () => {
      let delta = 10 * clock.getDelta()
      delta = delta < 2 ? delta : 2

      // rotate scene
      parent.rotation.y += -0.02 * delta

      // rotate meshes
      for (let j = 0; j < clonemeshes.length; j++) {
        const cm = clonemeshes[j]
        cm.mesh.rotation.y += -0.1 * delta * cm.speed
      }

      for (let j = 0; j < meshes.length; j++) {
        const data = meshes[j]
        const positions = data.mesh.geometry.attributes.position
        const initialPositions = data.mesh.geometry.attributes.initialPosition

        const { count } = positions

        if (data.start > 0) {
          data.start -= 1
        } else if (data.direction === 0) {
          data.direction = -1
        }

        for (let i = 0; i < count; i++) {
          const px = positions.getX(i)
          const py = positions.getY(i)
          const pz = positions.getZ(i)

          // falling down
          if (data.direction < 0) {
            if (py > 0) {
              positions.setXYZ(
                i,
                px + 1.5 * (0.5 - Math.random()) * data.speed * delta,
                py + 3.0 * (0.25 - Math.random()) * data.speed * delta,
                pz + 1.5 * (0.5 - Math.random()) * data.speed * delta
              )
            } else {
              data.verticesDown += 1
            }
          }

          // rising up
          if (data.direction > 0) {
            const ix = initialPositions.getX(i)
            const iy = initialPositions.getY(i)
            const iz = initialPositions.getZ(i)

            const dx = Math.abs(px - ix)
            const dy = Math.abs(py - iy)
            const dz = Math.abs(pz - iz)

            const d = dx + dy + dx

            if (d > 1) {
              positions.setXYZ(
                i,
                px - ((px - ix) / dx) * data.speed * delta * (0.85 - Math.random()),
                py - ((py - iy) / dy) * data.speed * delta * (1 + Math.random()),
                pz - ((pz - iz) / dz) * data.speed * delta * (0.85 - Math.random())
              )
            } else {
              data.verticesUp += 1
            }
          }
        }

        // all vertices down
        if (data.verticesDown >= count) {
          if (data.delay <= 0) {
            data.direction = 1
            data.speed = 5
            data.verticesDown = 0
            data.delay = 320
          } else {
            data.delay -= 1
          }
        }

        // all vertices up
        if (data.verticesUp >= count) {
          if (data.delay <= 0) {
            data.direction = -1
            data.speed = 15
            data.verticesUp = 0
            data.delay = 120
          } else {
            data.delay -= 1
          }
        }

        positions.needsUpdate = true
      }
      renderer.render(scene, camera)
    }

    // animation
    const animate = () => {
      requestAnimationFrame(animate)
      render()
    }
    animate()
  }, [])
  return (
    <>
      <div ref={mount} />
    </>
  )
}
export default CustomScene2
