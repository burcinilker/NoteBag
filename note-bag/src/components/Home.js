
import { Button, Container, Row, Col, ListGroup, Form } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import NbNavbar from './NbNavbar';

function Home() {

  const apiUrl = process.env.REACT_APP_URL ;
  const [notes, setNotes] = useState([]);
  const [activeNotes, setActiveNotes] = useState(null);
  
  //app bileşeni ilk render olduğunda (mount)
  useEffect(function () {

    axios.get(apiUrl)
      .then(function (response) {
        setNotes(response.data);
      });
  }, []);

  const handleTitleChange = function (e) {
    setActiveNotes({ ...activeNotes, title: e.target.value })
  };

  const handleContentChange = function (e) {
    setActiveNotes({ ...activeNotes, content: e.target.value })
  };

  const handleNewNote = function(e){
    axios.post(apiUrl,{title: "New Note",content: ""})
    .then(function(response){
      setNotes([response.data, ...notes]);
    });
  };

  const handleSaveNote = function(e){
    axios.put(apiUrl + "/" + activeNotes.id,
      {
        id:activeNotes.id ,
        title: activeNotes.title,
        content: activeNotes.content
      })
    .then(function(response){
      const notes2 = [...notes];
      const index =notes2.findIndex(x=>x.id === activeNotes.id);
      notes2[index] = response.data;
      setNotes(notes2);
      setActiveNotes({...response.data });
    });
  };


  const handleDelete = function(e){
    axios.delete(apiUrl + "/" + activeNotes.id)
    .then(function(response){
      setNotes(notes.filter(x=>x.id !== activeNotes.id));
      setActiveNotes(null);
    });

  };
  return (
    <div className="Home">
        <NbNavbar />

      <Container fluid className="mt-4">
        <Row>
          <Col sm={4} md={3}>
            <Button onClick={handleNewNote} >Yeni</Button>
            <ListGroup className="mb-3 mt-3">
              {
                notes.map((note) => <ListGroup.Item action key={note.id} active={note.id === activeNotes?.id}
                  onClick={() => setActiveNotes({ ...note })}>
                  {note.title}
                </ListGroup.Item>)}
            </ListGroup>
          </Col>

          <Col sm={8} md={9}>
            {
              activeNotes == null
                ?
                <div className="d-flex align-items-center justify-content-center" style={{ height: 400 }}>
                  Select a note to view/edit or create a new one!
                </div>
                :
                <Form>
                  <Form.Group className="mb-3" >
                    <Form.Control type="text" placeholder="Title" value={activeNotes.title} onChange={handleTitleChange} />
                  </Form.Group>
                  <Form.Group className="mb-3" >
                    <Form.Control as="textarea" placeholder="Content" rows={10} value={activeNotes.content} onChange={handleContentChange} />
                  </Form.Group>
                  <div>
                    <Button variant="primary" className="me-2" onClick={handleSaveNote} >Kaydet</Button>
                    <Button variant="danger" onClick={handleDelete} >Sil</Button>
                  </div>
                </Form>
            }
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
