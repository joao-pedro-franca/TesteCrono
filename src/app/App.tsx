import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: 'linear-gradient(135deg, #282828 0%, #32302f 100%)',
            color: '#ebdbb2',
            border: '1px solid rgba(80,73,69,0.7)',
          },
        }}
      />
    </>
  );
}