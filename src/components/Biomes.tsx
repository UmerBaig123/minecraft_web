import { useEffect, useState } from "react";
import { DirtBlock, GrassBlock } from "./Blocks";
import { RigidBody } from "@react-three/rapier";
export const RenderPlain = ({
  x_size,
  z_size,
  ...props
}: {
  x_size: number;
  z_size: number;
  [key: string]: any;
}) => {
  const [randoms, setRandoms] = useState<number[][]>([[]]);
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    var randomArray = [...Array(x_size)].map(() =>
      [...Array(z_size)].map(() => Math.random())
    );
    setRandoms(randomArray);
    setShow(true);
  }, [x_size, z_size]);
  if (!show) return <></>;
  return (
    <RigidBody type="fixed" name="plain">
      <group {...props}>
        {[...Array(x_size)].map((_, i) => {
          return (
            <>
              {[...Array(z_size)].map((_, j) => {
                return (
                  <DirtBlock position={[i - x_size / 2, 0, j - z_size / 2]} />
                );
              })}
              {[...Array(z_size)].map((_, j) => {
                return (
                  <>
                    {randoms[i][j] > 0.1 ? (
                      <GrassBlock
                        position={[i - x_size / 2, 1, j - z_size / 2]}
                      />
                    ) : (
                      <>
                        {randoms[i][j] > 0.02 ? (
                          <DirtBlock
                            position={[i - x_size / 2, 1, j - z_size / 2]}
                          />
                        ) : null}
                      </>
                    )}
                  </>
                );
              })}
            </>
          );
        })}
      </group>
    </RigidBody>
  );
};
