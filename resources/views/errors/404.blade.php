<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title> Página no encontrada</title>
        
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap" rel="stylesheet">
        
        <!-- Scripts -->
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
        
        <style>
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
                font-size: 12rem;
                color: white;
                text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
                animation: float 3s ease-in-out infinite;
            }
            
            .number:nth-child(1) {
                animation-delay: 0s;
            }
            
            .number:nth-child(2) {
                animation-delay: 0.5s;
                position: relative;
            }
            
            .number:nth-child(3) {
                animation-delay: 1s;
            }
            
            .circular-images {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 300px;
                height: 300px;
                animation: rotate 20s linear infinite;
            }
            
            .image-item {
                position: absolute;
                width: 60px;
                height: 60px;
                border-radius: 8px;
                overflow: hidden;
                opacity: 0.7;
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
            
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
            }
            
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
            .hidden-zero {
  visibility: hidden;  
            }

        </style>
    </head>
    <body>
        <div class="error-404-container">
            <div class="numbers-container dela-gothic-one-regular">
                <div class="number">4</div>
               <div class="number">
  <span class="hidden-zero">0</span>
  <div class="circular-images">
    <div class="image-item">
      <img src="https://plus.unsplash.com/premium_photo-1698406096055-91a364147db5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687" alt="">
    </div>
    <div class="image-item">
      <img src="https://images.unsplash.com/photo-1759854887818-0b505861a16d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=740" alt="">
    </div>
    <div class="image-item">
      <img src="https://images.unsplash.com/photo-1657483996697-337d02ab98e5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=765" alt="">
    </div>
    <div class="image-item">
      <img src="https://images.unsplash.com/photo-1729145213869-d32ec797d00c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764" alt="">
    </div>
    <div class="image-item">
      <img src="https://images.unsplash.com/photo-1759912302282-f2243c6d8894?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1284" alt="">
    </div>
    <div class="image-item">
      <img src="https://plus.unsplash.com/premium_photo-1760344795428-6692befdfe93?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170" alt="">
    </div>
    <div class="image-item">
      <img src="https://plus.unsplash.com/premium_photo-1760436654627-b4f604f5dc15?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332" alt="">
    </div>
    <div class="image-item">
      <img src="https://plus.unsplash.com/premium_photo-1760492101148-24485e4f83e5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=769" alt="">
    </div>
  </div>
</div>

                <div class="number">4</div>
            </div>
            
            <div class="bottom-text">
  <h1 class="dela-gothic-one-regular">Página No Encontrada</h1>
  <p>LLÉVAME DE VUELTA A INICIO</p>
  <button class="home-button dela-gothic-one-regular" onclick="window.location.href='/'">
    Regresar
  </button>
</div>

    </body>
</html>