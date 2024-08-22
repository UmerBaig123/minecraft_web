import { Canvas } from "@react-three/fiber";
import "./App.css";
import { Environment } from "@react-three/drei";
import { RenderPlain } from "./components/Biomes";
import PlayerControls from "./components/PlayerControls";
import { Suspense, useEffect, useRef, useState } from "react";
import { Physics, RigidBody } from "@react-three/rapier";
import { GrassBlock } from "./components/Blocks";
// import PlayerControls from "./components/PlayerControls";

function App() {
  const [pressedKey, setPressedKey] = useState<string>("");
  const [canJump, setCanJump] = useState<boolean>(true);
  const BlockRef = useRef<any>();
  const boxRef = useRef<any>();
  const planeRef = useRef<any>();
  // const cameraRef = useRef<any>();
  useEffect(() => {
    document.getElementById("textInput")?.focus();
  }, []);
  return (
    <>
      <div
        style={{
          height: "0px",
        }}
      >
        <input
          type="text"
          id="textInput"
          placeholder="Press Enter..."
          name="keyPressDetector"
          autoComplete="off"
          onKeyDown={(e) => {
            if (e.key.length == 1) {
              if (pressedKey.includes(e.key)) {
                return;
              }
              setPressedKey((data) => data + e.key);
            }
          }}
          onKeyUp={(e) => {
            setPressedKey((data) => data.replace(e.key, ""));
          }}
          style={{
            width: "0px",
            height: "0px",
            opacity: 0,
          }}
          // hidden
        />
      </div>
      <Canvas
        id="canvas"
        camera={{
          position: [0, 2, 5],
        }}
        raycaster={{}}
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "skyblue",
          cursor: "crosshair",
        }}
      >
        <Suspense>
          <Physics debug={false} updateLoop="independent">
            <PlayerControls
              pressedKey={pressedKey}
              obj={BlockRef.current}
              boxRef={boxRef}
              boxPhysics={BlockRef}
              canJump={canJump}
              setCanJump={setCanJump}
              planeRef={planeRef}
            />
            <Environment preset="city" />
            <RigidBody
              colliders="ball"
              type="dynamic"
              ref={BlockRef}
              angularDamping={0}
              // density={0}
              mass={0}
              onCollisionEnter={(e) => {
                if (e.colliderObject?.name == "plain") {
                  setCanJump(true);
                }
              }}
            >
              <GrassBlock thisref={boxRef} position={[0, 3, 0]} />
            </RigidBody>
            {/* <OrbitControls /> */}
            <RenderPlain
              x_size={10}
              z_size={10}
              ref={planeRef}
              position={[0, -2, 0]}
            />
          </Physics>
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
