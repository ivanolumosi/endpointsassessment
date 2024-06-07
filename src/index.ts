import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
}

const app = express();
const PORT = 3000;
const notes: Note[] = [];
app.use(bodyParser.json());

app.post('/notes', (req: Request, res: Response) => {
    const { title, content } = req.body;
    const newNote: Note = {
        id: Math.random().toString(36).substr(2, 9),
        title,
        content,
        createdAt: new Date()
    };
    notes.push(newNote);
    res.status(201).json(newNote);
});

app.get('/notes', (req: Request, res: Response) => {
    res.json(notes);
});

app.get('/notes/:id', (req: Request, res: Response) => {
    const note = notes.find(note => note.id === req.params.id);
    if (!note) res.status(404).json({ error: 'Note not found' });
    else res.json(note);
});

app.put('/notes/:id', (req: Request, res: Response) => {
    const { title, content } = req.body;
    const noteIndex = notes.findIndex(note => note.id === req.params.id);
    if (noteIndex === -1) res.status(404).json({ error: 'Note not found' });
    else {
        notes[noteIndex] = { ...notes[noteIndex], title, content };
        res.json(notes[noteIndex]);
    }
});

app.delete('/notes/:id', (req: Request, res: Response) => {
    const noteIndex = notes.findIndex(note => note.id === req.params.id);
    if (noteIndex === -1) res.status(404).json({ error: 'Note not found' });
    else {
        notes.splice(noteIndex, 1);
        res.sendStatus(204);
    }
});

app.listen(PORT, () => {
    console.log("Server is running on port ${PORT}");
});