/*
Combined Logic:
- Model Loading: red_car.glb (User's specific model)
- Interaction: Rotation logic from the provided article snippet.
*/

import React, { useRef, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
    nodes: {
        Object_2: THREE.Mesh;
        Object_3: THREE.Mesh;
        Object_4: THREE.Mesh;
        Object_5: THREE.Mesh;
        Object_6: THREE.Mesh;
        Object_7: THREE.Mesh;
    };
    materials: {
        initialShadingGroup: THREE.Material;
    };
};

interface CarProps {
    isRotating: boolean;
    setIsRotating: (rotating: boolean) => void;
    scale?: number[];
    position?: number[];
    rotation?: number[];
}

export function Car({ isRotating, setIsRotating, ...props }: CarProps) {
    // Load the GLTF model - Using the user's red_car.glb
    const { nodes, materials } = useGLTF('/red_car.glb') as GLTFResult;

    // Access WebGL context and viewport size
    const { gl, viewport } = useThree();

    // Refs for managing interaction state
    const lastX = useRef(0);
    const rotationSpeed = useRef(0);
    const dumpingFactor = 0.95;
    const modelRef = useRef<THREE.Group>(null);

    const handlePointerDown = (event: PointerEvent | React.PointerEvent) => {
        event.stopPropagation();
        event.preventDefault();
        setIsRotating(true);
        // @ts-ignore - Handle touch vs mouse event differences broadly
        const clientX = event.touches ? event.touches[0].clientX : event.clientX;
        lastX.current = clientX;
    };

    const handlePointerUp = (event: PointerEvent | React.PointerEvent) => {
        event.stopPropagation();
        event.preventDefault();
        setIsRotating(false);
    };

    const handlePointerMove = (event: PointerEvent | React.PointerEvent) => {
        event.stopPropagation();
        event.preventDefault();

        if (isRotating && modelRef.current) {
            // @ts-ignore
            const clientX = event.touches ? event.touches[0].clientX : event.clientX;
            const deltaX = (clientX - lastX.current) / viewport.width;

            modelRef.current.rotation.y += deltaX * Math.PI * 0.01; // Slower rotation
            rotationSpeed.current = deltaX * Math.PI * 0.01;
            lastX.current = clientX;
        }
    };

    useEffect(() => {
        const canvas = gl.domElement;
        // We need to cast the listener because React's types and DOM types conflict slightly
        canvas.addEventListener('pointerdown', handlePointerDown as any);
        canvas.addEventListener('pointerup', handlePointerUp as any);
        canvas.addEventListener('pointermove', handlePointerMove as any);

        return () => {
            canvas.removeEventListener('pointerdown', handlePointerDown as any);
            canvas.removeEventListener('pointerup', handlePointerUp as any);
            canvas.removeEventListener('pointermove', handlePointerMove as any);
        };
    }, [gl, isRotating]); // Re-bind if isRotating state needs to be fresh, though ref handles it mainly

    useFrame(() => {
        if (!isRotating) {
            rotationSpeed.current *= dumpingFactor;
            if (Math.abs(rotationSpeed.current) < 0.001) {
                rotationSpeed.current = 0;
            }
            if (modelRef.current) {
                modelRef.current.rotation.y += rotationSpeed.current;
            }
        }
    });

    return (
        <group {...props} dispose={null} ref={modelRef}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_2.geometry}
                    material={materials.initialShadingGroup}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_3.geometry}
                    material={materials.initialShadingGroup}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_4.geometry}
                    material={materials.initialShadingGroup}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_5.geometry}
                    material={materials.initialShadingGroup}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_6.geometry}
                    material={materials.initialShadingGroup}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_7.geometry}
                    material={materials.initialShadingGroup}
                />
            </group>
        </group>
    );
}

useGLTF.preload('/red_car.glb');
