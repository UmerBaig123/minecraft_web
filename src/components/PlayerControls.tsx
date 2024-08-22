import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import { Vector3, Box3 } from "three";

const PlayerControls = ({
  pressedKey,
  canJump,
  setCanJump,
  boxRef,
  planeRef,
}: any) => {
  const camera = useThree((state) => state.camera);
  const [initialY, setInitialY] = useState<number>(2);
  const [jumping, setJumping] = useState<boolean>(false);
  const [inJump, setInJump] = useState<boolean>(false);
  useEffect(() => {
    document.getElementById("canvas")?.addEventListener("click", () => {
      document.getElementById("canvas")?.requestPointerLock();
    });
  }, []);
  function findRatio(x: number, z: number, constraint: number) {
    const magnitude = Math.sqrt(x * x + z * z);

    // Normalize x and z to get the unit vector
    const normalizedX = x / magnitude;
    const normalizedZ = z / magnitude;

    // Scale the unit vector to fit within the constraint |X| + |Z| <= 1
    const scale = Math.min(
      constraint / (Math.abs(normalizedX) + Math.abs(normalizedZ)),
      constraint
    );

    // Compute the final X and Z
    const X = normalizedX * scale;
    const Z = normalizedZ * scale;

    return { x: X, z: Z };
  }
  function jump() {
    if (jumping) {
      boxRef.current.position.y -=
        (initialY + 3.5 - boxRef.current.position.y) * 0.1 + 0.03;
      if (boxRef.current.position.y <= initialY + 2) {
        setJumping(false);
        setInJump(false);
      }
    } else {
      boxRef.current.position.y +=
        (initialY + 3.5 - boxRef.current.position.y) * 0.1 + 0.03;
      if (boxRef.current.position.y >= initialY + 3.5) {
        setJumping(true);
      }
    }
  }
  useFrame(() => {
    var target = new Vector3();
    camera.getWorldDirection(target);

    var box = new Box3().setFromObject(boxRef.current);
    var plane = new Box3().setFromObject(planeRef.current);
    if (box.intersectsBox(plane)) {
      alert("You hit the ground!");
    }
    var xRatio = findRatio(target.x, target.z, 0.2).x;
    var zRatio = findRatio(target.x, target.z, 0.2).z;
    if (boxRef.current.intersectsMesh(planeRef.current)) {
      alert("You hit the ground!");
    }
    if ((target.x < 0 && xRatio < 0) || (target.x > 0 && xRatio > 0)) {
      xRatio = -xRatio;
    }
    if ((target.z < 0 && zRatio < 0) || (target.z > 0 && zRatio > 0)) {
      zRatio = -zRatio;
    }
    if (pressedKey.includes(" ") && canJump && !inJump) {
      setInitialY(boxRef.current.position.y - 2);
      jump();
      setInJump(true);
    }
    if (inJump) {
      jump();
    }

    if (pressedKey.includes("W") || pressedKey.includes("w")) {
      boxRef.current.position.x -= xRatio;
      boxRef.current.position.z -= zRatio;
    }
    if (pressedKey.includes("s") || pressedKey.includes("S")) {
      boxRef.current.position.x += xRatio;
      boxRef.current.position.z += zRatio;
    }
    if (pressedKey.includes("d") || pressedKey.includes("D")) {
      boxRef.current.position.x += zRatio;
      boxRef.current.position.z -= xRatio;
    }
    if (pressedKey.includes("A") || pressedKey.includes("a")) {
      boxRef.current.position.x -= zRatio;
      boxRef.current.position.z += xRatio;
    }
    camera.position.set(
      boxRef.current.position.x,
      boxRef.current.position.y - 1,
      boxRef.current.position.z
    );
  });
  return (
    <>
      <PointerLockControls />
    </>
  );
};
export default PlayerControls;
