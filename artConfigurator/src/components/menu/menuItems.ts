import { AddingEditingKopien } from "../../pages/AddingEditingKopien";
import { AddingEditingPaint } from "../../pages/Paint";
import { PaintingsKopien } from "../../pages/PaintingsKopien";
import { Biography } from "../../pages/biography";

export const menuItemsWithPaths = [
  {
    id: 1,
    name: "Biography",
    path: "/biography",
    element: Biography,
  },
  {
    id: 2,
    name: "Paint",
    children: [
      {
        id: 4,
        name: "Add paint",
        path: "/add-paint",
        element: AddingEditingPaint,
        isEditMode: false,
      },
      {
        id: 5,
        name: "Edit paint",
        path: "/edit-paint",
        element: AddingEditingPaint,
        isEditMode: true,
      },
    ],
  },
  {
    id: 3,
    name: "Kopien",
    children: [
      {
        id: 6,
        name: "Add kopien",
        path: "/add-kopien",
        element: AddingEditingKopien,
        isEditMode: false,
      },
      {
        id: 7,
        name: "Edit kopien",
        path: "/edit-kopien",
        element: AddingEditingKopien,
        isEditMode: true,
      },
    ],
  },
  {
    id: 8,
    name: "Paintings kopien",
    path: "/paintings-kopien",
    element: PaintingsKopien,
  },
];
