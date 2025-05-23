import { makeAutoObservable } from "mobx";

export interface CircleShape {
    id: string;
    x: number;
    y: number;
    radius: number;
    fill: string,
    isSelected?: boolean;
}

export interface LineShape {
    id: string;
    points: number[];
    stroke: string;
    strokeWidth: number;
    tension?: number;
    lineCap?: "round" | "butt" | "square";
    closed?: boolean;
    fill?: string;
}


class ShapeStore {
    circles: CircleShape[] = [];
    lines: LineShape[] = [];
    tooltipEnabled: boolean = false;
    drawMode: boolean = false;
    isDrawing: boolean = false;
    fillMode: boolean = false;
    layers: { id: string; shapes: any }[] = []; //TODO: Fix shape typing. Create interface.
    activeLayerId: string | null = null;
    activeTool: 'circle' | 'brush' | 'fill' | null = null;

    circleSettings = {
        radius: 50,
        fill: '#ff0000',
    };

    brushSettings = {
        strokeWidth: 4,
        stroke: '#000000',
    };

    fillSettings = {
        fill: '#000000',
    };

    constructor() {
        makeAutoObservable(this);
    }

    addLayer(shape: any) {
        const newLayerId = `Layer ${this.layers.length + 1}`;
        const newLayer = {
        id: newLayerId,
        shapes: shape,
        };
        this.layers.push(newLayer);
        this.activeLayerId = newLayerId;
    }

    addCircle(x: number, y: number) {
        if (!this.tooltipEnabled) return;
        this.circles.push({
            id: String(Date.now()),
            x,
            y,
            radius: this.circleSettings.radius,
            fill: this.circleSettings.fill,
        })
        this.addLayer(this.circles[this.circles.length - 1])
    }

    startLine(x: number, y: number) {
        if (!this.drawMode) return;
        this.lines.push({
        id: String(Date.now()),
        points: [x, y],
        stroke: this.brushSettings.stroke,
        strokeWidth: this.brushSettings.strokeWidth,
        tension: 0.5,
        lineCap: "round",
        closed: false,
        });
        this.addLayer(this.lines[this.lines.length - 1])
        this.isDrawing = true;
    }

    fillShape(id: string) {

        const circle = this.circles.find((circle) => String(circle.id) === id);
        if (circle) {
            circle.fill = this.fillSettings.fill; 
            return;
        }
    }

    updateCircleSettings(radius: number, fill: string) {
        this.circleSettings.radius = radius;
        this.circleSettings.fill = fill;
    }

    updateBrushSettings(strokeWidth: number, stroke: string) {
        this.brushSettings.strokeWidth = strokeWidth;
        this.brushSettings.stroke = stroke;
    }

    updateFillSettings(fill: string) {
        this.fillSettings.fill = fill;
    }

    extendLine(x: number, y: number) {
        if (!this.drawMode) return;
        const line = this.lines[this.lines.length - 1];
        if (line) line.points = [...line.points, x, y];
    }

    setTool(tool: 'circle' | 'brush' | 'fill') {
        this.activeTool = tool;
    }

    toggleTooltip() {
        this.tooltipEnabled = !this.tooltipEnabled;
        this.drawMode = false;
        this.fillMode = false;

        this.activeTool = this.tooltipEnabled ? 'circle' : null;
    }

    toggleDrawMode() {
        this.drawMode = !this.drawMode;
        this.tooltipEnabled = false;
        this.fillMode = false;

        this.activeTool = this.drawMode ? 'brush' : null;
    }

    toggleFillMode() {
        this.fillMode = !this.fillMode;
        this.tooltipEnabled = false;
        this.drawMode = false;

        this.activeTool = this.fillMode ? 'fill' : null;
    }

    stopDrawing() {
    this.isDrawing = false;
    }

    deleteLayer(id: string) {
        const layerToDelete = this.layers.find(layer => layer.id === id);
        if (layerToDelete) {
            const shapeID = layerToDelete.shapes.id;
            this.layers = this.layers.filter(layer => layer.id !== id);
            this.circles = this.circles.filter(circle => circle.id !== shapeID);
            this.lines = this.lines.filter(line => line.id !== shapeID);
            this.activeLayerId = null;
        }
    }
}

const shapeStore = new ShapeStore();
export default shapeStore