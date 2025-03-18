// Set initialization flag
window.threeJsLoaded = true;

// Log initialization
console.log("main.js is executing");

// Try importing from the import map
let THREE, OrbitControls;

try {
    // Dynamic import for browsers that don't support import maps
    const threePromise = import('https://unpkg.com/three@0.159.0/build/three.module.js');
    const orbitPromise = import('https://unpkg.com/three@0.159.0/examples/jsm/controls/OrbitControls.js');
    
    Promise.all([threePromise, orbitPromise]).then(([threeModule, orbitModule]) => {
        THREE = threeModule;
        OrbitControls = orbitModule.OrbitControls;
        console.log("THREE.js loaded via dynamic import", THREE.REVISION);
        
        // Remove fallback message
        const fallbackElement = document.getElementById('fallback');
        if (fallbackElement && fallbackElement.parentNode) {
            fallbackElement.parentNode.removeChild(fallbackElement);
        }
        
        initGame();
    }).catch(error => {
        console.error("Error loading modules:", error);
        document.getElementById('fallback').style.display = 'block';
    });
} catch (error) {
    console.error("Error in dynamic import:", error);
    document.getElementById('fallback').style.display = 'block';
}

function initGame() {
    // Game variables
    let scene, camera, renderer, controls;
    let platform, soldiers = [], bonuses = [];
    let soldierCount = 10;
    let speed = 0.05;
    let platformWidth = 10;
    let platformLength = 100;
    let gameOver = false;
    let clock = new THREE.Clock();
    let soldierGroup;
    let legAnimationPhase = 0;
    let envObjects = [];
    let moveLeft = false;
    let moveRight = false;
    let movementSpeed = 2.0; // Units per second for smooth movement
    
    // Start the game
    startGame();
    
    function startGame() {
        try {
            console.log("Starting game initialization");
            init();
            animate();
            console.log("Game initialization complete");
            
            // Set global initialization flag and remove fallback
            window.threeJsInitialized = true;
            const fallbackElement = document.getElementById('fallback');
            if (fallbackElement && fallbackElement.parentNode) {
                fallbackElement.parentNode.removeChild(fallbackElement);
            }
        } catch (error) {
            console.error("Game initialization failed:", error);
            document.getElementById('error').style.display = 'block';
            document.getElementById('error').innerText = 'Game initialization failed: ' + error.message;
            document.getElementById('fallback').style.display = 'block';
        }
    }
    
    function init() {
        try {
            console.log("Init started");
            
            // Create scene
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x87ceeb); // Sky blue
            scene.fog = new THREE.Fog(0x87ceeb, 20, 100);
            
            // Create camera
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(0, 10, -20);
            camera.lookAt(0, 0, 0);
            
            // Create renderer
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.shadowMap.enabled = true;
            document.body.appendChild(renderer.domElement);
            
            console.log("Renderer created and added to DOM", renderer);
            
            // Add lights
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);
            
            const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(10, 20, 10);
            directionalLight.castShadow = true;
            scene.add(directionalLight);
            
            // Create orbit controls
            controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.minDistance = 5;
            controls.maxDistance = 30;
            
            // Create platform
            createPlatform();
            
            // Create soldier group
            soldierGroup = new THREE.Group();
            scene.add(soldierGroup);

            // Create initial soldiers
            for (let i = 0; i < soldierCount; i++) {
                createSoldier(i % 5 - 2, 0, -3 - Math.floor(i / 5) * 1.5);
            }
            
            // Create bonus items
            createBonuses();
            
            // Add event listeners
            window.addEventListener('resize', onWindowResize);
            document.addEventListener('keydown', onKeyDown);
            document.addEventListener('keyup', onKeyUp);
            
            console.log("Init completed successfully");
        } catch (error) {
            console.error("Error in init function:", error);
            throw error;
        }
    }
    
    function createPlatform() {
        // Create a platform
        const platformGeometry = new THREE.BoxGeometry(platformWidth, 1, platformLength);
        const platformMaterial = new THREE.MeshStandardMaterial({ color: 0x666666 });
        platform = new THREE.Mesh(platformGeometry, platformMaterial);
        platform.position.set(0, -0.5, platformLength / 2 - 10);
        platform.receiveShadow = true;
        scene.add(platform);
        
        // Add side rails to indicate edges
        const railGeometry = new THREE.BoxGeometry(0.5, 1, platformLength);
        const railMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
        
        const leftRail = new THREE.Mesh(railGeometry, railMaterial);
        leftRail.position.set(-platformWidth/2, 0, platformLength / 2 - 10);
        scene.add(leftRail);
        
        const rightRail = new THREE.Mesh(railGeometry, railMaterial);
        rightRail.position.set(platformWidth/2, 0, platformLength / 2 - 10);
        scene.add(rightRail);
        
        // Add an end marker
        const finishGeometry = new THREE.BoxGeometry(platformWidth, 2, 3);
        const finishMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x0000ff, 
            emissive: 0x0000ff, 
            emissiveIntensity: 0.5 
        });
        
        const finish = new THREE.Mesh(finishGeometry, finishMaterial);
        finish.position.set(0, 0, platformLength - 13);
        scene.add(finish);
        
        console.log("Platform created", platform);
    }

    function createSoldier(x, y, z) {
        // Create soldier model
        const soldier = new THREE.Group();
        
        // Create soldier body (torso)
        const bodyGeometry = new THREE.CylinderGeometry(0.3, 0.3, 1, 8);
        const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x2233dd });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.set(0, 1, 0);
        body.castShadow = true;
        soldier.add(body);
        
        // Create soldier head
        const headGeometry = new THREE.SphereGeometry(0.3, 16, 16);
        const headMaterial = new THREE.MeshStandardMaterial({ color: 0xffaa88 });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.set(0, 1.8, 0);
        head.castShadow = true;
        soldier.add(head);
        
        // Create soldier helmet
        const helmetGeometry = new THREE.CylinderGeometry(0.32, 0.35, 0.3, 8);
        const helmetMaterial = new THREE.MeshStandardMaterial({ color: 0x335533 });
        const helmet = new THREE.Mesh(helmetGeometry, helmetMaterial);
        helmet.position.set(0, 1.9, 0);
        helmet.castShadow = true;
        soldier.add(helmet);
        
        // Create soldier arms
        const armGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.7, 8);
        const armMaterial = new THREE.MeshStandardMaterial({ color: 0x2233dd });
        
        const leftArm = new THREE.Mesh(armGeometry, armMaterial);
        leftArm.position.set(-0.4, 1.1, 0);
        leftArm.rotation.z = Math.PI / 6;
        leftArm.castShadow = true;
        soldier.add(leftArm);
        
        const rightArm = new THREE.Mesh(armGeometry, armMaterial);
        rightArm.position.set(0.4, 1.1, 0);
        rightArm.rotation.z = -Math.PI / 6;
        rightArm.castShadow = true;
        soldier.add(rightArm);
        
        // Create soldier legs
        const legGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.8, 8);
        const legMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
        
        const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
        leftLeg.position.set(-0.2, 0.4, 0);
        leftLeg.castShadow = true;
        leftLeg.name = "leftLeg";
        soldier.add(leftLeg);
        
        const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
        rightLeg.position.set(0.2, 0.4, 0);
        rightLeg.castShadow = true;
        rightLeg.name = "rightLeg";
        soldier.add(rightLeg);
        
        // Set position
        soldier.position.set(x, y, z);
        
        // Add to soldier group and array
        soldierGroup.add(soldier);
        soldiers.push(soldier);
        
        console.log("Soldier created", soldier);
    }
    
    function createBonuses() {
        // Create bonus items along the path
        for (let i = 0; i < 15; i++) {
            // Randomize position
            const x = (Math.random() - 0.5) * (platformWidth - 1);
            const z = 10 + i * 5;
            
            // Determine if it's a positive or negative bonus
            const isPositive = Math.random() > 0.3;
            const value = isPositive ? Math.floor(Math.random() * 5) + 1 : -Math.floor(Math.random() * 3) - 1;
            
            createBonus(x, z, value);
        }
    }
    
    function createBonus(x, z, value) {
        const geometry = new THREE.BoxGeometry(1, 0.5, 1);
        const color = value > 0 ? 0x00ff00 : 0xff0000;
        const material = new THREE.MeshStandardMaterial({ 
            color: color, 
            emissive: color, 
            emissiveIntensity: 0.5 
        });
        
        const bonus = new THREE.Mesh(geometry, material);
        bonus.position.set(x, 0.5, z);
        bonus.userData = { value: value, initialY: 0.5 };
        
        // Create text label for the bonus
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 128;
        canvas.height = 64;
        
        context.font = '50px Arial';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.fillText(value > 0 ? "+" + value : value, 64, 48);
        
        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.position.set(0, 1, 0);
        sprite.scale.set(1, 0.5, 1);
        bonus.add(sprite);
        
        scene.add(bonus);
        bonuses.push(bonus);
        
        console.log("Bonus created", bonus);
    }
    
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    function onKeyDown(event) {
        if (gameOver) return;
        
        switch (event.key) {
            case 'ArrowLeft':
                moveLeft = true;
                break;
            case 'ArrowRight':
                moveRight = true;
                break;
        }
    }
    
    function onKeyUp(event) {
        switch (event.key) {
            case 'ArrowLeft':
                moveLeft = false;
                break;
            case 'ArrowRight':
                moveRight = false;
                break;
        }
    }
    
    function updateSoldierCount(value) {
        soldierCount += value;
        
        // Update UI
        document.getElementById('soldierCount').textContent = soldierCount;
        
        if (value > 0) {
            // Add new soldiers
            for (let i = 0; i < value; i++) {
                const rowPosition = Math.floor(soldiers.length / 5);
                const colPosition = soldiers.length % 5;
                createSoldier(colPosition - 2, 0, -3 - rowPosition * 1.5);
            }
        } else {
            // Remove soldiers
            for (let i = 0; i < Math.abs(value); i++) {
                if (soldiers.length > 0) {
                    const soldier = soldiers.pop();
                    soldierGroup.remove(soldier);
                }
            }
        }
        
        // Game over if all soldiers are gone
        if (soldierCount <= 0) {
            gameOver = true;
            const info = document.getElementById('info');
            info.innerHTML = "GAME OVER - Refresh to play again";
            info.style.color = "red";
        }
    }
    
    function checkBonusCollisions() {
        const soldierBoundingBox = new THREE.Box3().setFromObject(soldierGroup);
        
        for (let i = bonuses.length - 1; i >= 0; i--) {
            const bonus = bonuses[i];
            const bonusBoundingBox = new THREE.Box3().setFromObject(bonus);
            
            if (soldierBoundingBox.intersectsBox(bonusBoundingBox)) {
                // Collect bonus
                updateSoldierCount(bonus.userData.value);
                
                // Remove bonus
                scene.remove(bonus);
                bonuses.splice(i, 1);
            }
        }
    }
    
    function checkFallingOffPlatform() {
        // Check each soldier individually
        for (let i = soldiers.length - 1; i >= 0; i--) {
            const soldier = soldiers[i];
            const worldPosition = new THREE.Vector3();
            soldier.getWorldPosition(worldPosition);
            
            // Check if the soldier is off the platform
            if (Math.abs(worldPosition.x) > platformWidth / 2) {
                // Remove the soldier
                soldierGroup.remove(soldier);
                soldiers.splice(i, 1);
                
                // Update soldier count
                soldierCount--;
                document.getElementById('soldierCount').textContent = soldierCount;
            }
        }
        
        // Game over if all soldiers are gone
        if (soldierCount <= 0) {
            gameOver = true;
            const info = document.getElementById('info');
            info.innerHTML = "GAME OVER - All soldiers fell off! Refresh to play again";
            info.style.color = "red";
        }
    }
    
    function checkGameCompletion() {
        if (soldierGroup.position.z >= platformLength - 15 && !gameOver) {
            gameOver = true;
            const info = document.getElementById('info');
            info.innerHTML = "YOU WIN! - With " + soldierCount + " soldiers";
            info.style.color = "green";
        }
    }
    
    function animateSoldierLegs() {
        const walkSpeed = 5;
        legAnimationPhase += 0.1;
        
        soldiers.forEach((soldier, index) => {
            // Get legs
            const leftLeg = soldier.getObjectByName("leftLeg");
            const rightLeg = soldier.getObjectByName("rightLeg");
            
            // Offset phase for each row of soldiers
            const rowPhaseOffset = Math.floor(index / 5) * 0.5;
            const phase = legAnimationPhase + rowPhaseOffset;
            
            // Animate legs
            if (leftLeg && rightLeg) {
                leftLeg.rotation.x = Math.sin(phase * walkSpeed) * 0.5;
                rightLeg.rotation.x = Math.sin((phase * walkSpeed) + Math.PI) * 0.5;
            }
        });
    }
    
    function animate() {
        try {
            requestAnimationFrame(animate);
            
            const delta = clock.getDelta(); // Get time since last frame
            
            // Move soldiers forward if not game over
            if (!gameOver) {
                // Forward movement
                soldierGroup.position.z += speed;
                camera.position.z += speed;
                controls.target.z += speed;
                
                // Smooth left/right movement based on keys
                if (moveLeft) {
                    soldierGroup.position.x -= movementSpeed * delta; // Correct direction: - is left
                }
                if (moveRight) {
                    soldierGroup.position.x += movementSpeed * delta; // Correct direction: + is right
                }
                
                // Animate soldier legs
                animateSoldierLegs();
                
                // Add a subtle hovering effect to the platform
                platform.position.y = -0.5 + Math.sin(Date.now() * 0.001) * 0.1;
            }
            
            // Update bonus animations
            bonuses.forEach(bonus => {
                bonus.position.y = bonus.userData.initialY + Math.sin(Date.now() * 0.003) * 0.2;
                bonus.rotation.y += 0.01;
            });
            
            // Check for collisions
            checkBonusCollisions();
            checkFallingOffPlatform();
            checkGameCompletion();
            
            // Update controls
            controls.update();
            
            // Render the scene
            renderer.render(scene, camera);
        } catch (error) {
            console.error("Error in animation loop:", error);
            document.getElementById('error').style.display = 'block';
            document.getElementById('error').innerText = 'Animation error: ' + error.message;
        }
    }
} 