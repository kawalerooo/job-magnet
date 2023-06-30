import React, { useEffect, useRef, useState, useContext } from 'react';
import {
    Create,
    Delete,
    Save,
    FormatShapes,
    ColorLens,
    Redo,
} from '@mui/icons-material';
import { QueueContext } from '../queueSystemFiles/QueueContext';
import {
    Button,
    Slider,
    Grid,
    Typography,
    Paper,
    Container,
    CssBaseline,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from '@mui/material';

const RecruitmentRoom = ({ id }) => {
    const canvasRef = useRef(null);
    const [ctx, setCtx] = useState(null);
    const [drawingHistory, setDrawingHistory] = useState([]);
    const [redoHistory, setRedoHistory] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [brushSize, setBrushSize] = useState(5);
    const [brushColor, setBrushColor] = useState('#000000');
    const [currentTool, setCurrentTool] = useState('pencil');
    const [image, setImage] = useState(null);
    const [fillColor, setFillColor] = useState('#ffffff');
    const [showFillDialog, setShowFillDialog] = useState(false);
    const [showSaveDialog, setShowSaveDialog] = useState(false);
    const [showOpenDialog, setShowOpenDialog] = useState(false);
    const [savedDrawings, setSavedDrawings] = useState([]);

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
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === 'z') {
                undo();
            }
            if (e.ctrlKey && e.key === 'y') {
                redo();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        const stateToSave = {
            brushSize,
            brushColor,
        };
        localStorage.setItem('recruitmentRoomState', JSON.stringify(stateToSave));
    }, [brushSize, brushColor]);

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
            setRedoHistory([]);
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
            const lastImageData = drawingHistory[drawingHistory.length - 1];
            setDrawingHistory(drawingHistory.slice(0, -1));
            setRedoHistory([...redoHistory, lastImageData]);
            drawingHistory.slice(0, -1).forEach((imageData) => {
                ctx.putImageData(imageData, 0, 0);
            });
        }
    };

    const redo = () => {
        if (ctx && redoHistory.length > 0) {
            const canvas = canvasRef.current;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const nextImageData = redoHistory[redoHistory.length - 1];
            setRedoHistory(redoHistory.slice(0, -1));
            ctx.putImageData(nextImageData, 0, 0);
            setDrawingHistory([...drawingHistory, nextImageData]);
        }
    };

    const clearCanvas = () => {
        if (ctx) {
            const canvas = canvasRef.current;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            setDrawingHistory([]);
            setRedoHistory([]);
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

    const exportDrawing = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'my_drawing.png';
        link.click();
    };

    const openFillDialog = () => {
        setShowFillDialog(true);
    };

    const closeFillDialog = () => {
        setShowFillDialog(false);
    };

    const fillCanvas = () => {
        if (ctx) {
            const canvas = canvasRef.current;
            const width = canvas.width;
            const height = canvas.height;

            ctx.fillStyle = fillColor;
            ctx.fillRect(0, 0, width, height);
        }
        setShowFillDialog(false);
    };

    const openSaveDialog = () => {
        setShowSaveDialog(true);
    };

    const closeSaveDialog = () => {
        setShowSaveDialog(false);
    };

    const saveDrawing = () => {
        const canvas = canvasRef.current;
        const drawingData = canvas.toDataURL('image/png');
        const drawingName = document.getElementById('drawing-name').value;

        const savedDrawing = {
            name: drawingName,
            data: drawingData,
        };

        setSavedDrawings([...savedDrawings, savedDrawing]);

        setShowSaveDialog(false);
    };

    const openOpenDialog = () => {
        setShowOpenDialog(true);
    };

    const closeOpenDialog = () => {
        setShowOpenDialog(false);
    };

    const openDrawing = (drawingData) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const img = new Image();
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
        img.src = drawingData;

        setShowOpenDialog(false);
    };

    const { currentTicket } = useContext(QueueContext);

    return (
        <Container
            component="main"
            maxWidth="lg"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}
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
                            <Button
                                variant="outlined"
                                onClick={openFillDialog}
                                startIcon={<FormatShapes />}
                            >
                                Wypełnij
                            </Button>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1">
                                Rozmiar rysika/gumki: {brushSize}
                            </Typography>
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
                                <Grid item>
                                    <Button
                                        onClick={() => changeBrushColor(fillColor)}
                                        style={{
                                            width: '2rem',
                                            height: '2rem',
                                            border: brushColor === fillColor ? '2px solid black' : 'none',
                                        }}
                                        startIcon={<ColorLens />}
                                    />
                                </Grid>
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
                        <Grid item>
                            <Button variant="contained" onClick={redo} startIcon={<Redo />}>
                                Redo
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" onClick={exportDrawing} startIcon={<Save />}>
                                Eksportuj rysunek
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" onClick={openSaveDialog} startIcon={<Save />}>
                                Zapisz rysunek
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" onClick={openOpenDialog} startIcon={<Save />}>
                                Otwórz rysunek
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
            <Dialog open={showFillDialog} onClose={closeFillDialog}>
                <DialogTitle>Wypełnij</DialogTitle>
                <DialogContent>
                    <Typography>Wybierz kolor wypełnienia:</Typography>
                    <Grid container spacing={1} justifyContent="center">
                        {colorPalette.map((color) => (
                            <Grid item key={color}>
                                <Button
                                    onClick={() => setFillColor(color)}
                                    style={{
                                        backgroundColor: color,
                                        width: '2rem',
                                        height: '2rem',
                                        border: fillColor === color ? '2px solid black' : 'none',
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={fillCanvas}>Wypełnij</Button>
                    <Button onClick={closeFillDialog}>Anuluj</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={showSaveDialog} onClose={closeSaveDialog}>
                <DialogTitle>Zapisz rysunek</DialogTitle>
                <DialogContent>
                    <TextField id="drawing-name" label="Nazwa rysunku" fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={saveDrawing}>Zapisz</Button>
                    <Button onClick={closeSaveDialog}>Anuluj</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={showOpenDialog} onClose={closeOpenDialog}>
                <DialogTitle>Otwórz rysunek</DialogTitle>
                <DialogContent>
                    {savedDrawings.map((drawing, index) => (
                        <Button
                            key={index}
                            onClick={() => openDrawing(drawing.data)}
                            style={{ marginBottom: '1rem' }}
                        >
                            {drawing.name}
                        </Button>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeOpenDialog}>Anuluj</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default RecruitmentRoom;
