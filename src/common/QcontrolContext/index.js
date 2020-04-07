import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';


export function DragDropContext(WrapComponent){
  return <DndProvider backend={HTML5Backend}>
          <WrapComponent />
        </DndProvider>
};
// export default DragDropContext;
