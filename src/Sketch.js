import React from 'react'
import { ReactP5Wrapper } from "@p5-wrapper/react";
import AzeretMono from './AzeretMono-SemiBold.otf';

var txt = " Ser Naturalmente Com ";
var font;
var trail = [];

const Sketch = () => {
    function sketch(p5) {
        p5.setup = () => {
            p5.createCanvas(500, 700);
            font = p5.loadFont(AzeretMono);
            p5.frameRate(60);
        }
    
        const radians = rad => (rad / 180.0) * Math.PI;
  
        p5.draw = () => {
            // Definir o fundo com a cor fixa
            p5.background("#17406f");

            // Adiciona a posição das letras à trilha
            for (let i = 0; i < txt.length; i++) {
                let ch = txt.charAt(i);
                let x = p5.mouseX + Math.tan(radians(p5.frameCount + i * p5.mouseX * 0.1)) * 200;
                let y = p5.mouseY + Math.sin(radians(p5.frameCount + i * p5.mouseY * 0.1)) * 200;
                trail.push({ x: x, y: y, char: ch });
            }
    
            // Limita o tamanho da trilha
            if (trail.length > 50 * txt.length) {
                trail.splice(0, txt.length);
            }
    
            // Desenho do rastro gradiente do stroke das letras
            for (let j = 1; j < trail.length; j++) {
                let gradientStep = j / trail.length;
                let lerpedColor = p5.lerpColor(p5.color("#17406f"), p5.color(255), gradientStep);
                p5.stroke(lerpedColor);
                p5.strokeWeight(9);
                p5.line(trail[j - 1].x, trail[j - 1].y, trail[j].x, trail[j].y);
            }
            
            // Desenho das letras
            p5.noFill();
            p5.stroke("#f1f1f1");
            p5.strokeWeight(2);
            p5.textFont(font);
            p5.textSize(80);
            p5.textAlign(p5.CENTER, p5.CENTER);
            for (let i = 0; i < trail.length; i++) {
                p5.text(trail[i].char, trail[i].x, trail[i].y);
            }
        }
    }

    return <ReactP5Wrapper sketch={sketch} />;
}

export default Sketch;
