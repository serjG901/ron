import { useEffect, useRef } from "react";

interface CanvasComponentProps {
  moveAngle: number;
  moveSpeed: number;
  deviceWidth: number;
  deviceHeight: number;
}

const CanvasComponent: React.FC<CanvasComponentProps> = ({
  moveAngle,
  moveSpeed,
  deviceWidth,
  deviceHeight,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const angleRef = useRef<number>(moveAngle);
  const speedRef = useRef<number>(moveSpeed);

  useEffect(() => {
    angleRef.current = moveAngle;
    speedRef.current = moveSpeed;
  }, [moveAngle, moveSpeed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas element not found");
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("2D context not available");
      return;
    }

    const ground = new Image();
    ground.src = "images/ground2.png"; // Укажите путь к вашему изображению

    ground.onload = () => {
      const imageSize = ground.naturalWidth; // Используем ширину изображения для размера

      const images: { x: number; y: number }[] = [];

      // Рассчитываем размеры канваса, кратные размеру изображения
      const extendedWidth = Math.ceil(canvas.width / imageSize) * imageSize;
      const extendedHeight = Math.ceil(canvas.height / imageSize) * imageSize;

      // Заполняем canvas изображениями, включая дополнительные за пределами видимой области
      for (let y = -imageSize; y < extendedHeight + imageSize; y += imageSize) {
        for (
          let x = -imageSize;
          x < extendedWidth + imageSize;
          x += imageSize
        ) {
          images.push({ x, y });
        }
      }

      function update(deltaTime: number) {
        const radians = angleRef.current * (Math.PI / 180);
        const dx = -Math.cos(radians) * speedRef.current * (deltaTime / 1000);
        const dy = Math.sin(radians) * speedRef.current * (deltaTime / 1000);

        images.forEach((image) => {
          image.x += dx;
          image.y += dy;

          // Зацикливаем движение изображений
          if (image.x > extendedWidth) image.x -= extendedWidth + imageSize;
          if (image.x < -imageSize) image.x += extendedWidth + imageSize;
          if (image.y > extendedHeight) image.y -= extendedHeight + imageSize;
          if (image.y < -imageSize) image.y += extendedHeight + imageSize;
        });
      }

      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        images.forEach((image) => {
          ctx.drawImage(ground, image.x, image.y, imageSize, imageSize);
        });
      }

      function loop(timestamp: number) {
        const deltaTime = timestamp - lastTimestamp;
        lastTimestamp = timestamp;

        update(deltaTime);
        draw();

        requestAnimationFrame(loop);
      }

      let lastTimestamp = 0;
      requestAnimationFrame(loop);

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      window.addEventListener("resize", handleResize);
      handleResize(); // Установить начальные размеры

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    };
  }, [deviceWidth, deviceHeight]);

  return <canvas ref={canvasRef} id='canvas' />;
};

export default CanvasComponent;
