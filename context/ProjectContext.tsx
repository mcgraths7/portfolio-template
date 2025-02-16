import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProjectIds } from '../contentful/queries/project';

interface ProjectContextProps {
  projectMap: Record<string, string>;
  loading: boolean;
  error: boolean;
}

const ProjectContext = createContext<ProjectContextProps | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projectMap, setProjectMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchProjectIds() {
      try {
        const ids = await getProjectIds();
        const map: Record<string, string> = {};
        ids.forEach(item => {
          if (item.slug && item.sys.id) {
            map[item.slug] = item.sys.id;
          }
        });
        setProjectMap(map);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchProjectIds();
  }, []);

  return (
    <ProjectContext.Provider value={{ projectMap, loading, error }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
