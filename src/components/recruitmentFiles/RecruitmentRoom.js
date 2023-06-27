import React, { useEffect, useRef, useState, useContext } from 'react';
import { Create, Delete } from '@mui/icons-material';
import { QueueContext } from '../queueSystemFiles/QueueContext';
import {
    Button,
    Slider,
    Grid,
    Typography,
    Paper,
    Container,
    CssBaseline,
} from '@mui/material';

const RecruitmentRoom = ({ id }) => {
    const canvasRef = useRef(null);
    const [ctx, setCtx] = useState(null);
    const [drawingHistory, setDrawingHistory] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [brushSize, setBrushSize] = useState(5);
    const [brushColor, setBrushColor] = useState('#000000');
    const [currentTool, setCurrentTool] = useState('pencil');
    const [image, setImage] = useState(null);

    const colorPalette = [
        '#000000', // czarny
        '#ff0000', // czerwony
        '#00ff00', // zielony
        '#0000ff', // niebieski
        '#ffff00', // żółty
        '#ff00ff', // różowy
        '#00ffff', // cyjan
        '#ff8c00', // pomarańczowy
        '#800080', // fioletowy
        '#008080', // turkusowy
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        setCtx(context);

        context.lineWidth = brushSize;
        context.lineCap = 'round';
        context.strokeStyle = brushColor;

        const savedState = localStorage.getItem('recruitmentRoomState');
        if (savedState) {
            const parsedState = JSON.parse(savedState);
            setBrushSize(parsedState.brushSize);
            setBrushColor(parsedState.brushColor);
            context.lineWidth = parsedState.brushSize;
            context.strokeStyle = parsedState.brushColor;
        }
    }, []);

    useEffect(() => {
        const stateToSave = {
            brushSize,
            brushColor,
        };
        localStorage.setItem('recruitmentRoomState', JSON.stringify(stateToSave));
    }, [brushSize, brushColor]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === 'z') {
                undo();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const startDrawing = (e) => {
        if (ctx) {
            let tool = 'pencil';
            if (currentTool === 'eraser') {
                tool = 'eraser';
            }

            if (tool === 'eraser') {
                ctx.globalCompositeOperation = 'destination-out';
            } else {
                ctx.globalCompositeOperation = 'source-over';
            }

            setIsDrawing(true);
            const canvas = canvasRef.current;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            ctx.beginPath();
            ctx.moveTo(x, y);
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        if (ctx) {
            const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
            setDrawingHistory([...drawingHistory, imageData]);
        }
    };

    const draw = (e) => {
        if (isDrawing && ctx) {
            const canvas = canvasRef.current;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    };

    const undo = () => {
        if (ctx && drawingHistory.length > 0) {
            const canvas = canvasRef.current;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            setDrawingHistory((prevHistory) => prevHistory.slice(0, -1));
            drawingHistory.slice(0, -1).forEach((imageData) => {
                ctx.putImageData(imageData, 0, 0);
            });
        }
    };

    const clearCanvas = () => {
        if (ctx) {
            const canvas = canvasRef.current;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            setDrawingHistory([]);
        }
    };

    const changeBrushSize = (e, newValue) => {
        setBrushSize(newValue);
        if (ctx) {
            ctx.lineWidth = newValue;
        }
    };

    const changeBrushColor = (color) => {
        setBrushColor(color);
        if (ctx) {
            ctx.strokeStyle = color;
        }
    };

    const changeTool = (tool) => {
        setCurrentTool(tool);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];

        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image();
            img.onload = () => {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');

                const aspectRatio = img.width / img.height;
                const canvasWidth = canvas.width;
                const canvasHeight = canvasWidth / aspectRatio;

                ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
                setImage(img);
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const { currentTicket } = useContext(QueueContext);

    return (
        <Container
            component="main"
            maxWidth="lg"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
        >
            <CssBaseline />
            <div>
                <div style={{ marginRight: '2rem' }}>
                    <Paper
                        elevation={3}
                        style={{
                            backgroundColor: '#f5f5f5',
                            padding: '2rem',
                            borderRadius: '5px',
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                            Pokój rekrutacyjny
                        </Typography>
                        {currentTicket && (
                            <Typography>Aktualnie obsługiwany bilet: {currentTicket.id}</Typography>
                        )}
                    </Paper>
                    <Grid
                        container
                        spacing={2}
                        alignItems="center"
                        justifyContent="center"
                        style={{ marginTop: '2rem' }}
                    >
                        <Grid item>
                            <Button
                                variant={currentTool === 'pencil' ? 'contained' : 'outlined'}
                                onClick={() => changeTool('pencil')}
                                startIcon={<Create />}
                            >
                                Rysik
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant={currentTool === 'eraser' ? 'contained' : 'outlined'}
                                onClick={() => changeTool('eraser')}
                                startIcon={<Delete />}
                            >
                                Gumka
                            </Button>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1">Rozmiar rysika/gumki:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Slider
                                value={brushSize}
                                min={1}
                                max={20}
                                step={1}
                                onChange={changeBrushSize}
                                style={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container spacing={1} justifyContent="center">
                                {colorPalette.map((color) => (
                                    <Grid item key={color}>
                                        <Button
                                            onClick={() => changeBrushColor(color)}
                                            style={{
                                                backgroundColor: color,
                                                width: '2rem',
                                                height: '2rem',
                                                border: brushColor === color ? '2px solid black' : 'none',
                                            }}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="error"
                                startIcon={<Delete />}
                                onClick={clearCanvas}
                            >
                                Wyczyść tablicę
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" onClick={undo} startIcon={<Delete />}>
                                Cofnij ostatni ruch
                            </Button>
                        </Grid>
                    </Grid>
                    <canvas
                        ref={canvasRef}
                        width={1600}
                        height={2000}
                        style={{ border: '1px solid black', marginTop: '2rem' }}
                        onMouseDown={startDrawing}
                        onMouseUp={stopDrawing}
                        onMouseMove={draw}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    />
                </div>
            </div>
        </Container>
    );
};

export default RecruitmentRoom;
