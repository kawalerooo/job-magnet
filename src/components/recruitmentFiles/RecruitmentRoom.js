import React, { useState, useContext, useEffect } from 'react';
import {
    Grid,
    Typography,
    Paper,
    Container,
    CssBaseline,
    TextField,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Button,
} from '@mui/material';
import {
    DeleteOutlined,
    ReplyOutlined,
} from '@mui/icons-material';
import { QueueContext } from '../queueSystemFiles/QueueContext';
import jsPDF from 'jspdf';
import './RecruitmentRoom.css';
import { ListItemSecondaryAction } from '@mui/material';

const RecruitmentRoom = ({ id }) => {
    const { currentTicket } = useContext(QueueContext);

    const [notes, setNotes] = useState({});
    const [input, setInput] = useState('');
    const [selectedMessageIndex, setSelectedMessageIndex] = useState(null);
    const [contextMenuIndex, setContextMenuIndex] = useState(null);
    const [contextMenuAnchor, setContextMenuAnchor] = useState(null);
    const [droppedImage, setDroppedImage] = useState(null);

    useEffect(() => {
        const savedNotes = localStorage.getItem('savedNotes');
        if (savedNotes) {
            setNotes(JSON.parse(savedNotes));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('savedNotes', JSON.stringify(notes));
    }, [notes]);

    const handleSend = () => {
        if (input) {
            const now = new Date();
            const timestamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
            const formattedInput = input.replace(/\n/g, '<br />');
            const message = {
                type: 'text',
                content: formattedInput,
                image: droppedImage ? URL.createObjectURL(droppedImage) : null,
                timestamp: timestamp,
                replyTo: selectedMessageIndex,
            };
            const newNotes = { ...notes };
            if (!newNotes[id]) {
                newNotes[id] = [];
            }
            newNotes[id].push(message);
            setNotes(newNotes);
            setInput('');
            setSelectedMessageIndex(null);
            setDroppedImage(null);
        }
    };

    const exportToPDF = () => {
        const pdf = new jsPDF();
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const lineHeight = 10;
        pdf.setFontSize(12);

        if (currentTicket) {
            pdf.setFontSize(14);
            pdf.text(`Archiwizacja aplikacji o ID : ${currentTicket.id}`, 15, 15);
            pdf.setFontSize(12);
        }

        pdf.text(`Data i godzina archiwizacji: ${new Date().toLocaleString()}`, 15, 25);

        let y = 40;
        let currentPage = 1;

        notes[id]?.forEach((message, index) => {
            if (y + 60 > pageHeight) {
                pdf.addPage();
                currentPage++;
                y = 40;
            }

            if (message.replyTo !== null && notes[id][message.replyTo]) {
                pdf.setTextColor(150);
                pdf.setFontSize(10);
                pdf.text(`W odpowiedzi na: ${notes[id][message.replyTo].content}`, 25, y);
                y += lineHeight;
                pdf.setTextColor(0);
                pdf.setFontSize(12);
            }

            const messageLines = pdf.splitTextToSize(
                message.content.replace(/<br\s*\/?>/g, '\n'),
                pageWidth - 30
            );

            pdf.setFillColor(240);
            pdf.rect(20, y - 5, pageWidth - 40, messageLines.length * lineHeight + 15, 'F');

            pdf.setTextColor(0);
            pdf.text(messageLines, 25, y + 5);
            y += messageLines.length * lineHeight + 20;

            if (message.image) {
                pdf.addImage(message.image, 'JPEG', 25, y, 80, 60);
                y += 70;
            }

            pdf.setFontSize(10);
            pdf.setTextColor(150);
            pdf.text(message.timestamp, 25, y);
            pdf.setTextColor(0);
            pdf.setFontSize(12);
            y += lineHeight;

            y += 10;

            if (y + 60 > pageHeight && index < notes[id].length - 1) {
                pdf.addPage();
                currentPage++;
                y = 40;
            }
        });

        for (let i = 1; i <= currentPage; i++) {
            pdf.setPage(i);
            pdf.setFontSize(10);
            pdf.text(`Strona ${i} z ${currentPage}`, pageWidth - 30, pageHeight - 10);
        }

        pdf.save(`chat_${id}_${new Date().toISOString()}.pdf`);
    };

    const handleDoubleClick = (index) => {
        setSelectedMessageIndex(index);
        setContextMenuIndex(index);
        setContextMenuAnchor(document.getElementById(`message-item-${index}`));
    };

    const handleContextMenuOpen = (event, index) => {
        event.preventDefault();
        setContextMenuIndex(index);
        setContextMenuAnchor(event.currentTarget);
    };

    const handleContextMenuClose = () => {
        setContextMenuIndex(null);
        setContextMenuAnchor(null);
    };

    const handleDelete = (index) => {
        const newNotes = { ...notes };
        if (newNotes[id]) {
            newNotes[id] = newNotes[id].filter((_, i) => i !== index);
            setNotes(newNotes);
        }
        handleContextMenuClose();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const files = event.dataTransfer.files;

        if (files.length > 0) {
            const fileArray = Array.from(files);
            const imageFile = fileArray.find((file) => file.type.startsWith('image/'));

            if (imageFile) {
                setDroppedImage(imageFile);
            }
        }
    };

    const handleDeleteDroppedImage = () => {
        setDroppedImage(null);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <Container className="main-container" onDrop={handleDrop} onDragOver={handleDragOver}>
            <CssBaseline />
            <Grid container spacing={3} className="main-grid">
                <Grid item xs={12} className="messenger-panel">
                    <Paper elevation={3} className="messenger-paper">
                        <Typography variant="h4" className="title">
                            Pokój rekrutacyjny
                        </Typography>
                        {currentTicket && (
                            <Typography className="current-ticket">
                                Zgłoszenie: {currentTicket.id}
                            </Typography>
                        )}
                        <List className="message-list">
                            {notes[id]?.map((message, index) => (
                                <ListItem
                                    key={index}
                                    id={`message-item-${index}`}
                                    className={`message-item ${
                                        selectedMessageIndex === index ? 'selected-message' : ''
                                    }`}
                                    onDoubleClick={() => handleDoubleClick(index)}
                                    onContextMenu={(event) => handleContextMenuOpen(event, index)}
                                >
                                    <ListItemText
                                        primary={
                                            <div>
                                                <div dangerouslySetInnerHTML={{ __html: message.content }} />
                                                {message.image && (
                                                    <img
                                                        src={message.image}
                                                        alt="Attached"
                                                        className="attached-image"
                                                    />
                                                )}
                                            </div>
                                        }
                                        secondary={message.timestamp}
                                        className="message-text"
                                    />
                                    {message.replyTo !== null && (
                                        <Typography variant="body2" className="reply-info">
                                            W odpowiedzi na: {notes[id][message.replyTo]?.content}
                                        </Typography>
                                    )}
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => handleDelete(index)}
                                        >
                                            <DeleteOutlined />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                        <div className="input-container">
                            <TextField
                                fullWidth
                                variant="outlined"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend();
                                    }
                                }}
                                placeholder="Twoja notatka..."
                                className="input-field"
                                multiline
                                rowsMax={4}
                            />
                            <div className="send-button-container">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSend}
                                    className="send-button"
                                    style={{ height: '100%', marginLeft: '8px' }}
                                >
                                    <ReplyOutlined />

                                </Button>
                            </div>
                        </div>
                        <div className="generate-pdf-button-container">
                            <div className="generate-pdf-button-wrapper">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={exportToPDF}
                                    className="generate-pdf-button"
                                    style={{ margin: '10px auto', display: 'block' }}
                                >
                                    Archiwizuj notatnik (PDF)
                                </Button>
                            </div>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
            <div className="dropped-image-container">
                {droppedImage && (
                    <div className="dropped-image">
                        <img
                            src={URL.createObjectURL(droppedImage)}
                            alt="Dropped"
                            className="dropped-image"
                        />
                        <IconButton
                            edge="end"
                            aria-label="delete-dropped-image"
                            onClick={handleDeleteDroppedImage}
                            className="delete-dropped-image-button"
                        >
                            <DeleteOutlined />
                        </IconButton>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default RecruitmentRoom;
