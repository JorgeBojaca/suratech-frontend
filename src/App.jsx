import { useEffect, useState, useRef } from 'react';
import portfolioService from './features/portfolio/services/portfolioService.js'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(false);

  const hasFetched = useRef(false);


  useEffect(() => {

    if (hasFetched.current) return;

    const getProjects = async () => {
      try {
        const _projects = await portfolioService.getProjects();
        setProjects([...projects, ..._projects])

      } catch (error) {
        setError(error);
      }
    }

    getProjects();


    return () => {
      hasFetched.current = true;
    }

  }, []);

  return (
    <>
      <section id="center" className='st:flex'>
        <div>
          <h1>Personal Creative Portafolio</h1>
        </div>
        {projects.map(project =>
          (<div key={project.id}>{project.name}</div>)
        )}
        {error ? (<div>{error.toString()}</div>) : (<></>)}

      </section>
    </>
  )
}

export default App
