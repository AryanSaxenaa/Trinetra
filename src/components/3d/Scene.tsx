import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Car } from './Car';
import { Loader } from '@react-three/drei';

export function Scene() {
    const [isRotating, setIsRotating] = useState(false);
    const [scale, setScale] = useState<[number, number, number]>([1, 1, 1]);
    const [position, setPosition] = useState<[number, number, number]>([0, -6.5, -43]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setScale([0.1, 0.1, 0.1]);
            } else {
                setScale([0.1, 0.1, 0.1]);
                setPosition([0, -3.0, 0]);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="w-full h-[500px] relative rounded-3xl overflow-hidden bg-brand-gray-50 border border-brand-gray-100">
            <div className="absolute top-4 left-4 z-10">
                <h3 className="text-brand-black text-lg font-bold tracking-tight">DIGITAL TWIN</h3>
                <p className="text-xs text-gray-500 font-medium">LIVE TELEMETRY FEED</p>
            </div>

            <Suspense fallback={
                <div className="absolute inset-0 flex items-center justify-center text-brand-black">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-current"></div>
                </div>
            }>
                <Canvas
                    className={`${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
                    camera={{ position: [3, 3, 15], fov: 45, near: 0.1, far: 200 }}
                >
                    {/* Studio Lighting Setup */}
                    <ambientLight intensity={0.7} />
                    <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" castShadow />
                    <directionalLight position={[-10, 10, -5]} intensity={0.5} color="#ffffff" />
                    <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={1} castShadow />

                    {/* Environment fill */}
                    <hemisphereLight args={['#ffffff', '#f0f0f0', 0.6]} />

                    <Car
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                        scale={scale}
                        position={position}
                    />
                </Canvas>
            </Suspense>

            <Loader />

            <div className="absolute bottom-4 right-4 text-right pointer-events-none">
                <p className="text-brand-black font-mono text-xs font-bold">ROTATION: ACTIVE</p>
                <p className="text-gray-500 text-[10px]">USE MOUSE TO ROTATE</p>
            </div>
        </div>
    );
}
