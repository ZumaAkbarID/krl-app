export default function Background({ svg }: { svg: string }) {
  return (
    <img
      src={svg}
      alt=""
      style={{
        position: "absolute",
        zIndex: -10,
        top: "0",
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        height: "auto",
      }}
    />
  );
}
