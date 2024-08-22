import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

const Block = ({
  position,
  texture,
  textureTop,
  textureBottom,
  textureFront,
  textureBack,
  textureLeft,
  textureRight,
  myref,
  color,
  ...props
}: any) => {
  return (
    <mesh position={position} ref={myref} {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        map={textureLeft || texture}
        color={color}
        attach={"material-0"}
      />
      <meshStandardMaterial
        map={textureRight || texture}
        color={color}
        attach={"material-1"}
      />
      <meshStandardMaterial
        map={textureTop || texture}
        color={color}
        attach={"material-2"}
      />
      <meshStandardMaterial
        map={textureBottom || texture}
        color={color}
        attach={"material-3"}
      />
      <meshStandardMaterial
        map={textureFront || texture}
        color={color}
        attach={"material-4"}
      />
      <meshStandardMaterial
        map={textureBack || texture}
        color={color}
        attach={"material-5"}
      />
    </mesh>
  );
};
export const DirtBlock = (props: any) => {
  var texture = useLoader(TextureLoader, "dirt.jpg");
  return <Block texture={texture} ref={props.ref} {...props} color={"white"} />;
};
export const GrassBlock = ({ thisref, ...props }: any) => {
  var texture = useLoader(TextureLoader, "grass.jpg");
  var textureTop = useLoader(TextureLoader, "grass-top.jpeg");
  var textureBottom = useLoader(TextureLoader, "dirt.jpg");
  return (
    <Block
      texture={texture}
      myref={thisref}
      textureBottom={textureBottom}
      textureTop={textureTop}
      color={"rgb(200, 200, 200)"}
      {...props}
    />
  );
};
