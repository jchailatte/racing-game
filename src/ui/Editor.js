import { useControls } from 'leva'
import { useStore, vehicleConfig, wheelInfo } from '../store'

const { directionLocal, axleLocal, chassisConnectionPointLocal, rollInfluence, ...filteredWheelInfo } = wheelInfo

export function Editor() {
  const get = useStore((state) => state.get)
  const set = useStore((state) => state.set)
  const {
    suspensionStiffness,
    suspensionRestLength,
    useCustomSlidingRotationalSpeed,
    customSlidingRotationalSpeed,
    suspensionForce,
    frictionSlip,
    sideAcceleration,
  } = useStore((state) => state.raycast.wheelInfos[0])
  const { radius, width, height, front, back, steer, force, maxBrake, maxSpeed } = useStore((state) => state.vehicleConfig)

  const [, setVehicleEditor] = useControls(() => ({
    radius: {
      value: radius,
      min: 0.1,
      max: 2,
      step: 0.01,
      onChange: (value) =>
        set({
          vehicleConfig: { ...get().vehicleConfig, radius: value },
          raycast: { ...get().raycast, wheelInfos: get().raycast.wheelInfos.map((info) => ({ ...info, radius: value })) },
        }),
    },
    width: {
      value: width,
      min: 0.1,
      max: 10,
      step: 0.01,
      onChange: (value) =>
        set({
          vehicleConfig: { ...get().vehicleConfig, width: value },
          raycast: {
            ...get().raycast,
            wheelInfos: get().raycast.wheelInfos.map((info) => ({
              ...info,
              chassisConnectionPointLocal: [
                info.chassisConnectionPointLocal[0] < 0 ? -value / 2 : value / 2,
                info.chassisConnectionPointLocal[1],
                info.chassisConnectionPointLocal[2],
              ],
            })),
          },
        }),
    },
    height: {
      value: height,
      min: -5,
      max: 5,
      step: 0.01,
      onChange: (value) =>
        set({
          vehicleConfig: { ...get().vehicleConfig, height: value },
          raycast: {
            ...get().raycast,
            wheelInfos: get().raycast.wheelInfos.map((info) => ({
              ...info,
              chassisConnectionPointLocal: [info.chassisConnectionPointLocal[0], value, info.chassisConnectionPointLocal[2]],
            })),
          },
        }),
    },
    front: {
      value: front,
      min: -10,
      max: 10,
      step: 0.05,
      onChange: (value) =>
        set({
          vehicleConfig: { ...get().vehicleConfig, front: value },
          raycast: {
            ...get().raycast,
            wheelInfos: get().raycast.wheelInfos.map((info, index) => ({
              ...info,
              chassisConnectionPointLocal: [
                info.chassisConnectionPointLocal[0],
                info.chassisConnectionPointLocal[1],
                index < 2 ? value : info.chassisConnectionPointLocal[2],
              ],
            })),
          },
        }),
    },
    back: {
      value: back,
      min: -10,
      max: 10,
      step: 0.05,
      onChange: (value) =>
        set({
          vehicleConfig: { ...get().vehicleConfig, back: value },
          raycast: {
            ...get().raycast,
            wheelInfos: get().raycast.wheelInfos.map((info, index) => ({
              ...info,
              chassisConnectionPointLocal: [
                info.chassisConnectionPointLocal[0],
                info.chassisConnectionPointLocal[1],
                index < 2 ? info.chassisConnectionPointLocal[2] : value,
              ],
            })),
          },
        }),
    },
    steer: {
      value: steer,
      min: 0.1,
      max: 1,
      step: 0.01,
      onChange: (value) => set({ vehicleConfig: { ...get().vehicleConfig, steer: value } }),
    },
    force: {
      value: force,
      min: 0,
      max: 3000,
      step: 1,
      onChange: (value) => set({ vehicleConfig: { ...get().vehicleConfig, force: value } }),
    },
    maxBrake: {
      value: maxBrake,
      min: 0.1,
      max: 100,
      step: 0.01,
      onChange: (value) => set({ vehicleConfig: { ...get().vehicleConfig, maxBrake: value } }),
    },
    maxSpeed: {
      value: maxSpeed,
      min: 1,
      max: 150,
      step: 1,
      onChange: (value) => set({ vehicleConfig: { ...get().vehicleConfig, maxSpeed: value } }),
    },
    suspensionStiffness: {
      value: suspensionStiffness,
      min: 0,
      max: 500,
      step: 1,
      onChange: (value) =>
        set({
          raycast: {
            ...get().raycast,
            wheelInfos: get().raycast.wheelInfos.map((info) => ({ ...info, suspensionStiffness: value })),
          },
        }),
    },
    suspensionRestLength: {
      value: suspensionRestLength,
      min: -10,
      max: 10,
      step: 0.01,
      onChange: (value) =>
        set({
          raycast: {
            ...get().raycast,
            wheelInfos: get().raycast.wheelInfos.map((info) => ({ ...info, suspensionRestLength: value })),
          },
        }),
    },
    useCustomSlidingRotationalSpeed: {
      value: useCustomSlidingRotationalSpeed,
      onChange: (value) =>
        set({
          raycast: {
            ...get().raycast,
            wheelInfos: get().raycast.wheelInfos.map((info) => ({ ...info, useCustomSlidingRotationalSpeed: value })),
          },
        }),
    },
    customSlidingRotationalSpeed: {
      value: customSlidingRotationalSpeed,
      min: -10,
      max: 10,
      step: 0.01,
      onChange: (value) =>
        set({
          raycast: {
            ...get().raycast,
            wheelInfos: get().raycast.wheelInfos.map((info) => ({ ...info, customSlidingRotationalSpeed: value })),
          },
        }),
    },
    suspensionForce: {
      value: suspensionForce,
      min: 0,
      max: 500,
      step: 0.01,
      onChange: (value) =>
        set({
          raycast: {
            ...get().raycast,
            wheelInfos: get().raycast.wheelInfos.map((info) => ({ ...info, suspensionForce: value })),
          },
        }),
    },
    frictionSlip: {
      value: frictionSlip,
      min: -10,
      max: 10,
      step: 0.01,
      onChange: (value) =>
        set({
          raycast: {
            ...get().raycast,
            wheelInfos: get().raycast.wheelInfos.map((info) => ({ ...info, frictionSlip: value })),
          },
        }),
    },
    sideAcceleration: {
      value: sideAcceleration,
      min: -10,
      max: 10,
      step: 0.01,
      onChange: (value) =>
        set({
          raycast: {
            ...get().raycast,
            wheelInfos: get().raycast.wheelInfos.map((info) => ({ ...info, sideAcceleration: value })),
          },
        }),
    },
    reset: {
      value: false,
      onChange: () => setVehicleEditor({ debug: false, reset: false, ...vehicleConfig, ...filteredWheelInfo }),
    },
    stats: { value: false, onChange: (stats) => set({ stats }) },
    debug: { value: false, onChange: (debug) => set({ debug }) },
  }))
  return null
}
