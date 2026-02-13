import { useBuilder } from '@/contexts/BuilderContext';
import { SectionRenderer } from '@/components/templates/SectionRenderer';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Edit, Layers, Sparkles, MousePointer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionData } from '@/types/builder';

function SortableSection({ section }: { section: SectionData }) {
  const { selectSection, selectedSection, removeSection } = useBuilder();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const isSelected = selectedSection === section.id;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group ${isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
        }`}
      onClick={() => selectSection(section.id)}
    >
      <div className={`absolute top-1 right-1 sm:top-2 sm:right-2 z-20 flex gap-0.5 sm:gap-2 transition-all duration-200 ${isSelected ? 'opacity-100 visible' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'}`}>
        <Button
          size="sm"
          variant="outline"
          className="h-7 w-7 sm:h-8 sm:w-8 p-0 shadow-lg bg-card hover:bg-accent border-border"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="h-7 w-7 sm:h-8 sm:w-8 p-0 shadow-lg bg-card hover:bg-accent border-border"
          onClick={(e) => {
            e.stopPropagation();
            selectSection(section.id);
          }}
        >
          <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
        <Button
          size="sm"
          variant="destructive"
          className="h-7 w-7 sm:h-8 sm:w-8 p-0 shadow-lg"
          onClick={(e) => {
            e.stopPropagation();
            removeSection(section.id);
          }}
        >
          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </div>
      <SectionRenderer section={section} isPreview />
    </div>
  );
}

export function BuilderCanvas() {
  const { sections, reorderSections } = useBuilder();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      reorderSections(arrayMove(sections, oldIndex, newIndex));
    }
  }

  if (sections.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white p-4">
        <div className="text-center space-y-4 sm:space-y-6 max-w-md mx-auto">
          <div className="relative">
            <img
              src="/Building.svg"
              alt="Start Building"
              className="w-64 h-64 sm:w-96 sm:h-96 mx-auto"
            />
          </div>
          <div className="space-y-1 sm:space-y-2">
            <h3 className="text-lg sm:text-2xl font-bold tracking-tight">Start Building</h3>
            <p className="text-xs sm:text-base text-muted-foreground leading-relaxed">
              <span className="hidden sm:inline">Select a template from the sidebar to add sections to your website.</span>
              <span className="sm:hidden">Tap Templates to add sections.</span>
            </p>
          </div>
          <div className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
            <MousePointer className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span className="hidden sm:inline">Click any template to get started</span>
            <span className="sm:hidden">Tap to begin</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-white scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sections.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="min-h-full">
            {sections.map((section) => (
              <SortableSection key={section.id} section={section} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
