/// <reference path="https://cdn.babylonjs.com/babylon.js">

const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
// Add your code here matching the playground format
console.log ("ceate scene den once");
const scene = createScene(); //Call the createScene function
// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
        scene.render();
}); 
// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
        engine.resize();
});

function createScene () {
    const scene = new BABYLON.Scene(engine);

    /**** Set camera and light *****/
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    //const ground = buildGround(scene);
    //const house = buildHouse (2);
    //const village =  buildVillage ();
  
    BABYLON.SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "village.glb").then (() => {
        var widht=0, length=0, height=0;
        var gr = scene.getMeshByName ("ground");
        var size = gr.getBoundingInfo().boundingBox.extendSize;

        
        console.log (size);
        console.log (size.x);
        console.log (size.y);
        console.log (size.z);

    });

    BABYLON.SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "car.babylon").then(() =>  {
        const car = scene.getMeshByName("car");
        car.rotation = new BABYLON.Vector3(-Math.PI/2, Math.PI, -Math.PI / 2);
        car.position.y = 0.16;
        car.position.x = -3;
        car.position.z = 8;

        const animCar = new BABYLON.Animation("carAnimation", "position.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

        const carKeys = []; 

        carKeys.push({
            frame: 0,
            value: 8
        });

        carKeys.push({
            frame: 150,
            value: -7
        });

        carKeys.push({
            frame: 200,
            value: -7
        });

        animCar.setKeys(carKeys);

        car.animations = [];
        car.animations.push(animCar);
        scene.beginAnimation(car, 0, 200, true);

      const wheelRB = scene.getMeshByName("wheelRB");
      const wheelRF = scene.getMeshByName("wheelRF");
      const wheelLB = scene.getMeshByName("wheelLB");
      const wheelLF = scene.getMeshByName("wheelLF");
      scene.beginAnimation(wheelRB, 0, 30, true);
      scene.beginAnimation(wheelRF, 0, 30, true);
      scene.beginAnimation(wheelLB, 0, 30, true);
      scene.beginAnimation(wheelLF, 0, 30, true);

    });

    var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
    var sph = BABYLON.Mesh.CreateSphere("sphere1", 16, 0.5, scene);
    myMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
    //myMaterial.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
    //myMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
    //myMaterial.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);
    sph.material = myMaterial;
    sph.position.x = 7.5;
    sph.position.z = 8;

    scene.onBeforeRenderObservable.add(() => {
        //sph.movePOV (0.01, 0, 0.01);
        sph.position.x -= 0.01;
        sph.position.z -= 0.01;
    });




    return scene;
}
