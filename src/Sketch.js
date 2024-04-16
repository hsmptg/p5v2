import React from 'react'
import { ReactP5Wrapper } from "@p5-wrapper/react";
import AzeretMono from './AzeretMono-SemiBold.otf';
import myBack from './c01.png';

var txt = " Ser Naturalmente Com ";
var font;
var trail = [];
var backgroundImage;

const Sketch = () => {
    function sketch(p5) {
        p5.setup = () => {
            p5.createCanvas(500, 700);
            font = p5.loadFont(AzeretMono);
            backgroundImage = p5.loadImage(myBack);
            p5.frameRate(60);
        }
    
        const radians = rad => (rad / 180.0) * Math.PI;
  
        p5.draw = () => {
            // Definir a cor de fundo antes de desenhar a imagem
            p5.background("#0000FF");

            // Desenhar a imagem de fundo
            p5.image(backgroundImage, 0, 0, p5.width, p5.height);

              // Adiciona a posição das letras à trilha
            for (let i = 1; i < txt.length; i++) {
                let ch = txt.charAt(i);
                let x = p5.mouseX + Math.cos(radians(p5.frameCount + i * p5.mouseX * 0.1)) * 150;
                let y = p5.mouseY + Math.tan(radians(p5.frameCount + i * p5.mouseY * 0.1)) * 150;
                trail.push({ x: x, y: y, char: ch });
            }

            // Limita o tamanho da trilha
            if (trail.length > 5 * txt.length) {
                trail.splice(0, txt.length);
            }

            // Desenho do rastro gradiente do stroke das letras
            for (let j = 1; j < trail.length; j++) {
                let gradientStep = j / trail.length;
                let lerpedColor = p5.lerpColor(p5.color("##0000FF"), p5.color(255), gradientStep);
                p5.stroke(lerpedColor);
                p5.strokeWeight(10);
                p5.line(trail[j - 0].x, trail[j - 0].y, trail[j].x, trail[j].y);
            }

            // Desenho das letras
            p5.fill("#0000FF"); // Preenchimento azul correspondente ao fundo
            p5.stroke("#FFFFFF"); // Sem contorno
            p5.textFont(font);
            p5.textSize(120);
            p5.textAlign(p5.CENTER, p5.CENTER);
            for (let i = 0; i < trail.length; i++) {
                p5.text(trail[i].char, trail[i].x, trail[i].y);
            }

        }
    }

    return <ReactP5Wrapper sketch={sketch} />;
}

export default Sketch;
