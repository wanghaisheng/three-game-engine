import RAPIER from "@dimforge/rapier3d-compat";
import { UserInterfaceJSON } from "./ui/UIHelpers";

// JSON Files

interface GameJSON {
    initialScene?: string;
    scenes?: Object;
    gameObjectTypes?: Object;
}

interface SceneJSON {
    background?: null;
    gameObjects?: GameObjectJSON[];
    gravity?: Vector3Data;
}

interface GameObjectJSON extends GameObjectOptions {
    type?: string;
    children?: GameObjectJSON[];
}

// Options structures

interface GameOptions {
    rendererOptions?: RendererOptions;
    assetOptions?: AssetOptions;
    inputOptions?: InputOptions;
    disablePhysics?: boolean;
}

interface RendererOptions {
    width?: number;
    height?: number;
    enableVR?: boolean;
    pixelRatio?: number;
    cameraOptions?: CameraOptions;
    setupFullScreenCanvas?: boolean;
    canvas?: HTMLCanvasElement;
    beforeRender?: (args: { deltaTimeInSec: number, time: number}) => void;
}

interface CameraOptions {
    fov?: number;
    aspect?: number;
    near?: number;
    far?: number;
}

interface AssetOptions {
    baseURL?: string;
}

interface InputOptions {
    wsadMovement?: boolean; // use WSAD keyboard keys to move around, just like arrow keys
    mouseOptions?: MediaStreamAudioSourceOptions;
}

interface MouseOptions {
    usePointerLock?: boolean;
}

interface GameObjectOptions {
    type?: string;
    name?: string;
    tags?: string[];
    userData?: Object;
    models?: ModelData[];
    lights?: LightData[];
    position?: Vector3Data;
    scale?: Vector3Data;
    rotation?: EulerValues;
    rigidBody?: RigidBodyData;
    userInterfaces?: UserInterfaceJSON[];
}

interface ModelData {
    assetPath: string;
    position?: Vector3Data;
}

interface RigidBodyData {
    type: 'dynamic' | 'fixed' | 'kinematicPositionBased' | 'kinematicVelocityBased';
    enabledTranslations?: {
        x: boolean,
        y: boolean,
        z: boolean,  
    },
    enabledRotations?: {
        x: boolean,
        y: boolean,
        z: boolean,
    },
    colliders: ColliderData[];
}

interface ColliderData {
    type: 
        'ball' | 
        'capsule' | 
        'cone' | 
        'convexHull' |
        'convexMesh' |
        'cuboid' | 
        'cylinder' |
        'polyline' |
        'roundCone' |
        'roundConvexHull' |
        'roundConvexMesh' |
        'roundCuboid' |
        'roundCylinder' |
        'roundTriangle' |
        'trimesh' | 
        'heightfield';

    density?: number; // default 1.0
    friction?: number; // default 0.5
    sensor?: boolean; // if true this is a sensor collider (for detecting things that enter its 3D volume) not a solid collider.

    // For a cuboid
    hx: number; // half length along x-axis
    hy: number; // half length along y-axis
    hz: number; // half length along z-axis

    halfHeight: number; // for a capsule
    radius: number; // for a ball or capsule

    borderRadius: number; // for a roundCone

    vertices: Float32Array; // for a trimesh
    indices: Uint32Array; // for a trimesh

    points: Float32Array;

    // For a heightfield
    nrows: number;
    ncols: number;
    heights: Float32Array;
    scale: RAPIER.Vector;

    // For a roundTriangle
    a: RAPIER.Vector;
    b: RAPIER.Vector;
    c: RAPIER.Vector;
}

interface EulerValues {
    x?: number;
    y?: number;
    z?: number;
    order?: string;
}

interface Vector3Data {
    x?: number;
    y?: number;
    z?: number;
}

interface LightData {
    type?: string;
    position?: Vector3Data;
}

interface CharacterControllerOptions {
    walkingSpeed?: number;
    runningSpeed?: number;
    jumpCooldown?: number;

    capsule?: ColliderData
}