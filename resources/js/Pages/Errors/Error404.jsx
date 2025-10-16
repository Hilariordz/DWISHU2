import React from 'react';
import { Head } from '@inertiajs/react';

export default function Error404() {
    return (
        <>
            <Head title="404 - Página no encontrada" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap');
                
                .dela-gothic-one-regular {
                    font-family: "Dela Gothic One", sans-serif;
                    font-weight: 400;
                    font-style: normal;
                }
                
                body {
                    margin: 0;
                    padding: 0;
                    background: #000;
                    overflow: hidden;
                }
                
                .error-404-container {
                    width: 100vw;
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    background: #000;
                }
                
                .numbers-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 2rem;
                    position: relative;
                    z-index: 10;
                }
                
                .number {
                    font-size: 18rem;
                    color: white;
                    text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
                }
                
                .number:nth-child(1) {
                    /* Sin animación */
                }
                
                .number:nth-child(2) {
                    position: relative;
                    color: transparent; /* Ocultar el 0 */
                }
                
                .number:nth-child(3) {
                    /* Sin animación */
                }
                
                .circular-images {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 450px;
                    height: 450px;
                    animation: rotate 20s linear infinite;
                }
                
                .image-item {
                    position: absolute;
                    width: 100px;
                    height: 100px;
                    border-radius: 12px;
                    overflow: hidden;
                    opacity: 0.9;
                    transition: opacity 0.3s ease;
                }
                
                .image-item img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    filter: none;
                }
                
                .image-item:hover {
                    opacity: 1;
                }
                
                .bottom-text {
                    position: absolute;
                    bottom: 5rem;
                    left: 50%;
                    transform: translateX(-50%);
                    text-align: center;
                    z-index: 10;
                }
                
                .bottom-text h1 {
                    font-size: 2rem;
                    color: white;
                    margin-bottom: 1rem;
                }
                
                .bottom-text p {
                    color: #888;
                    font-size: 1.2rem;
                    margin-bottom: 2rem;
                }
                
                .home-button {
                    background: #333;
                    color: white;
                    padding: 1rem 2rem;
                    border: none;
                    border-radius: 8px;
                    font-size: 1.2rem;
                    cursor: pointer;
                    transition: background 0.3s ease;
                }
                
                .home-button:hover {
                    background: #555;
                }
                
                /* Animación float removida */
                
                @keyframes rotate {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }
                
                /* Posiciones de las imágenes en círculo */
                .image-item:nth-child(1) { top: 0; left: 50%; transform: translateX(-50%); }
                .image-item:nth-child(2) { top: 15%; right: 15%; }
                .image-item:nth-child(3) { top: 50%; right: 0; transform: translateY(-50%); }
                .image-item:nth-child(4) { bottom: 15%; right: 15%; }
                .image-item:nth-child(5) { bottom: 0; left: 50%; transform: translateX(-50%); }
                .image-item:nth-child(6) { bottom: 15%; left: 15%; }
                .image-item:nth-child(7) { top: 50%; left: 0; transform: translateY(-50%); }
                .image-item:nth-child(8) { top: 15%; left: 15%; }
            `}</style>

            <div className="error-404-container">
                <div className="numbers-container dela-gothic-one-regular">
                    <div className="number">4</div>
                    <div className="number">
                        0
                        <div className="circular-images">
                            <div className="image-item">
                                <img src="https://picsum.photos/seed/404-1/300/300" alt="" />
                            </div>
                            <div className="image-item">
                                <img src="https://picsum.photos/seed/404-2/300/300" alt="" />
                            </div>
                            <div className="image-item">
                                <img src="https://picsum.photos/seed/404-3/300/300" alt="" />
                            </div>
                            <div className="image-item">
                                <img src="https://picsum.photos/seed/404-4/300/300" alt="" />
                            </div>
                            <div className="image-item">
                                <img src="https://picsum.photos/seed/404-5/300/300" alt="" />
                            </div>
                            <div className="image-item">
                                <img src="https://picsum.photos/seed/404-6/300/300" alt="" />
                            </div>
                            <div className="image-item">
                                <img src="https://picsum.photos/seed/404-7/300/300" alt="" />
                            </div>
                            <div className="image-item">
                                <img src="https://picsum.photos/seed/404-8/300/300" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="number">4</div>
                </div>

                <div className="bottom-text">
                    <h1 className="dela-gothic-one-regular">Página No Encontrada</h1>
                    <p>LLÉVAME DE VUELTA A INICIO</p>
                    <button
                        className="home-button dela-gothic-one-regular"
                        onClick={() => window.location.href = '/'}
                    >
                        REGRESAR
                    </button>
                </div>
            </div>
        </>
    );
}