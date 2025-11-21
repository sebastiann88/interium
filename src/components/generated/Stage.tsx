import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import { ChevronDown, ChevronRight, Plus, Search, Bell, Mail, User, MoreHorizontal, Box as BoxIcon, X, Upload, Settings, Camera, Lock, CreditCard, Moon, Sun, Globe, Save, LogOut, Trash2, Printer, Download, Twitter, Facebook, Instagram, Linkedin, GripVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// -- Types & Constants --

type TreeItem = {
  id: string;
  label: string;
  children?: TreeItem[];
  isOpen?: boolean;
  imageUrl?: string;
};
type InvoiceItem = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  imageUrl?: string;
};
type DragPreview = {
  imageUrl: string;
  label: string;
  x: number;
  y: number;
} | null;
const BRAND_ITEMS = [{
  id: 'brand1',
  label: 'Brand 1',
  imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=150&h=150&fit=crop&auto=format'
}, {
  id: 'brand2',
  label: 'Brand 2',
  imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=150&h=150&fit=crop&auto=format'
}, {
  id: 'brand3',
  label: 'Brand 3',
  imageUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=150&h=150&fit=crop&auto=format'
}, {
  id: 'brand4',
  label: 'Brand 4',
  imageUrl: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=150&h=150&fit=crop&auto=format'
}, {
  id: 'brand5',
  label: 'Brand 5',
  imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=150&h=150&fit=crop&auto=format'
}, {
  id: 'brand6',
  label: 'Brand 6',
  imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=150&h=150&fit=crop&auto=format'
}];
const INITIAL_TREE_DATA: TreeItem[] = [{
  id: 'furniture',
  label: 'Furniture',
  isOpen: false,
  children: BRAND_ITEMS
}, {
  id: 'coffee-tables',
  label: 'Coffee Tables',
  isOpen: false,
  children: BRAND_ITEMS
}, {
  id: 'light-fixtures',
  label: 'Light Fixtures',
  isOpen: false,
  children: BRAND_ITEMS
}, {
  id: 'paintings',
  label: 'Paintings',
  isOpen: false,
  children: BRAND_ITEMS
}, {
  id: 'ornaments',
  label: 'Ornaments',
  isOpen: false,
  children: BRAND_ITEMS
}];
const INITIAL_INVOICE_ITEMS: InvoiceItem[] = [{
  id: 'inv1',
  name: 'Modern Sofa',
  category: 'Furniture',
  quantity: 1,
  price: 1299.99,
  imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=150&h=150&fit=crop&auto=format'
}, {
  id: 'inv2',
  name: 'Oak Coffee Table',
  category: 'Coffee Tables',
  quantity: 1,
  price: 449.99,
  imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=150&h=150&fit=crop&auto=format'
}, {
  id: 'inv3',
  name: 'Pendant Light Fixture',
  category: 'Light Fixtures',
  quantity: 2,
  price: 179.99,
  imageUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=150&h=150&fit=crop&auto=format'
}, {
  id: 'inv4',
  name: 'Abstract Canvas Painting',
  category: 'Paintings',
  quantity: 1,
  price: 329.99,
  imageUrl: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=150&h=150&fit=crop&auto=format'
}, {
  id: 'inv5',
  name: 'Ceramic Vase Set',
  category: 'Ornaments',
  quantity: 3,
  price: 89.99,
  imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=150&h=150&fit=crop&auto=format'
}];

// -- 3D Components (Simplified to prevent flickering) --

const Room = () => {
  const { scene } = useGLTF('../../assets/glb/room.glb');
  
  // Enable shadows on all meshes
  scene.traverse((child: THREE.Object3D) => {
    if ((child as THREE.Mesh).isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  
  return <primitive object={scene} scale={1} position={[0, 0, 0]} />;
};

const Scene = () => {
  return <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-10, 10, -5]} intensity={0.3} />
      <Room />
      <OrbitControls enableZoom={true} enablePan={true} minPolarAngle={0} maxPolarAngle={Math.PI / 2.2} enableDamping={true} dampingFactor={0.05} />
    </>;
};

// -- UI Components --

const SidebarItem = ({
  item,
  level = 0,
  onToggle,
  onItemDragStart
}: {
  item: TreeItem;
  level?: number;
  onToggle: (id: string) => void;
  onItemDragStart: (item: TreeItem, e: React.DragEvent) => void;
}) => {
  return <div className="w-full">
      <div className={`flex items-center py-3 px-4 hover:bg-gray-50 cursor-pointer transition-colors ${level > 0 ? 'pl-8' : ''}`} onClick={() => item.children && onToggle(item.id)}>
        <div className="w-5 flex justify-center shrink-0 mr-3">
          {item.children && (item.isOpen ? <ChevronDown className="w-4 h-4 text-gray-600" /> : <ChevronRight className="w-4 h-4 text-gray-600" />)}
        </div>
        {item.imageUrl && <div className="w-12 h-12 shrink-0 mr-3 rounded-md overflow-hidden bg-gray-100 border border-gray-100">
            <img src={item.imageUrl} alt={item.label} className="w-full h-full object-cover" />
          </div>}
        <span className={`text-[15px] ${level === 0 ? 'font-semibold text-gray-900' : 'font-normal text-gray-700'}`}>
          {item.label}
        </span>
      </div>
      {item.isOpen && item.children && <div className="bg-white">
          {level === 0 ? <div className="grid grid-cols-2 gap-3 px-4 py-3">
              {item.children.map(child => <div key={child.id} className="flex flex-col items-center p-3 hover:bg-gray-50 cursor-move transition-colors rounded-lg border border-gray-100 group relative" draggable onDragStart={e => onItemDragStart(child, e)}>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <GripVertical className="w-4 h-4 text-gray-400" />
                  </div>
                  {child.imageUrl && <div className="w-full aspect-square rounded-md overflow-hidden bg-gray-100 mb-2">
                      <img src={child.imageUrl} alt={child.label} className="w-full h-full object-cover" />
                    </div>}
                  <span className="text-sm font-medium text-gray-700 text-center">{child.label}</span>
                </div>)}
            </div> : item.children.map(child => <SidebarItem key={child.id} item={child} level={level + 1} onToggle={onToggle} onItemDragStart={onItemDragStart} />)}
        </div>}
    </div>;
};
const Footer = ({ onNavigateAbout, onNavigateTutorials }: { onNavigateAbout?: () => void; onNavigateTutorials?: () => void }) => {
  return <footer className="bg-white border-t border-gray-200 pt-8 pb-6 px-8 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold text-gray-900">Interium</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Create stunning interior designs in 3D. Drag, drop, and customize your perfect space with our intuitive design tools.
            </p>
            <div className="flex gap-2 mt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:bg-[#1a8cd8] transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:bg-[#166FE5] transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:bg-[#004182] transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-bold text-gray-900">Resources</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <a href="#" className="block hover:text-[#1DA1F2] transition-colors">Documentation</a>
              <button onClick={onNavigateTutorials} className="block hover:text-[#1DA1F2] transition-colors text-left">Tutorials</button>
              <a href="#" className="block hover:text-[#1DA1F2] transition-colors">Support</a>
              <a href="#" className="block hover:text-[#1DA1F2] transition-colors">Community</a>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-bold text-gray-900">Company</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <button onClick={onNavigateAbout} className="block hover:text-[#1DA1F2] transition-colors text-left">About</button>
              <a href="#" className="block hover:text-[#1DA1F2] transition-colors">Blog</a>
              <a href="#" className="block hover:text-[#1DA1F2] transition-colors">Careers</a>
              <a href="#" className="block hover:text-[#1DA1F2] transition-colors">Contact</a>
            </div>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-bold text-gray-900">Newsletter</h3>
            <p className="text-sm text-gray-600">Stay updated with our latest features</p>
            <form className="flex flex-col gap-2">
              <input type="email" placeholder="Enter your email" className="bg-white text-gray-900 px-4 py-2 text-sm rounded-full border border-gray-300 outline-none focus:border-[#1DA1F2] focus:ring-2 focus:ring-[#1DA1F2]/20 transition-all" />
              <button className="bg-[#1DA1F2] text-white font-bold text-sm py-2 px-6 rounded-full hover:bg-[#1a8cd8] transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <p>© 2024 3D Designer. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#1DA1F2] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#1DA1F2] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#1DA1F2] transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>;
};

// @component: Stage
export const Stage = ({ onNavigateHome, onNavigateBlog, onNavigateContact, onNavigateAbout, onNavigateTutorials, onOpenLogin, onOpenRegister }: { onNavigateHome?: () => void; onNavigateBlog?: () => void; onNavigateContact?: () => void; onNavigateAbout?: () => void; onNavigateTutorials?: () => void; onOpenLogin?: () => void; onOpenRegister?: () => void }) => {
  const [treeData, setTreeData] = useState<TreeItem[]>(INITIAL_TREE_DATA);
  const [selectedRoom, setSelectedRoom] = useState<string>('Living Room');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [roomOptions, setRoomOptions] = useState<string[]>(['Living Room', 'Bedroom', 'Computer Room']);
  const [isImportOverlayOpen, setIsImportOverlayOpen] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState<boolean>(false);
  const [isAccountConfigOpen, setIsAccountConfigOpen] = useState<boolean>(false);
  const [activeConfigTab, setActiveConfigTab] = useState<string>('profile');
  const [isInvoiceOpen, setIsInvoiceOpen] = useState<boolean>(false);
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>(INITIAL_INVOICE_ITEMS);
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState<boolean>(false);
  const [newRoomName, setNewRoomName] = useState<string>('');
  const [isMyProjectsOpen, setIsMyProjectsOpen] = useState<boolean>(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState<boolean>(false);
  const [newProjectName, setNewProjectName] = useState<string>('');
  const [newProjectRoomType, setNewProjectRoomType] = useState<string>('Living Room');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dragPreview, setDragPreview] = useState<DragPreview>(null);
  const [projects, setProjects] = useState([{
    id: 'proj1',
    name: 'Modern Living Room',
    thumbnail: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop&auto=format',
    lastModified: new Date('2024-01-10'),
    roomType: 'Living Room',
    itemCount: 12
  }, {
    id: 'proj2',
    name: 'Minimalist Bedroom',
    thumbnail: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&h=300&fit=crop&auto=format',
    lastModified: new Date('2024-01-08'),
    roomType: 'Bedroom',
    itemCount: 8
  }, {
    id: 'proj3',
    name: 'Home Office Setup',
    thumbnail: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=300&fit=crop&auto=format',
    lastModified: new Date('2024-01-05'),
    roomType: 'Computer Room',
    itemCount: 15
  }]);

  // Account Configuration State
  const [accountConfig, setAccountConfig] = useState({
    profile: {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      username: 'johndoe',
      bio: 'Interior design enthusiast',
      avatar: ''
    },
    preferences: {
      theme: 'light',
      language: 'English',
      units: 'Metric',
      gridSnap: true,
      autoSave: true
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      projectUpdates: true,
      newsletter: true
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30'
    }
  });
  const configTabs = [{
    id: 'profile',
    label: 'Profile',
    icon: User
  }, {
    id: 'preferences',
    label: 'Preferences',
    icon: Settings
  }, {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell
  }, {
    id: 'security',
    label: 'Security',
    icon: Lock
  }, {
    id: 'billing',
    label: 'Billing',
    icon: CreditCard
  }];
  const toggleNode = (id: string) => {
    const updateTree = (items: TreeItem[]): TreeItem[] => {
      return items.map(item => {
        if (item.id === id) {
          return {
            ...item,
            isOpen: !item.isOpen
          };
        }
        if (item.children) {
          return {
            ...item,
            children: updateTree(item.children)
          };
        }
        return item;
      });
    };
    setTreeData(updateTree(treeData));
  };
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log('Selected file:', files[0]);
      setIsImportOverlayOpen(false);
    }
  };
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      console.log('Dropped file:', e.dataTransfer.files[0]);
      setIsImportOverlayOpen(false);
    }
  };
  const updateAccountConfig = (section: string, field: string, value: string | boolean) => {
    setAccountConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };
  const handleSaveAccountConfig = () => {
    console.log('Saving account configuration:', accountConfig);
    setIsAccountConfigOpen(false);
  };
  const removeInvoiceItem = (id: string) => {
    setInvoiceItems(items => items.filter(item => item.id !== id));
  };
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setInvoiceItems(items => items.map(item => item.id === id ? {
      ...item,
      quantity: newQuantity
    } : item));
  };
  const calculateSubtotal = () => {
    return invoiceItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };
  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };
  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };
  const handlePrintInvoice = () => {
    window.print();
  };
  const handleDownloadPDF = () => {
    // In a real implementation, you would use a library like jsPDF or html2pdf
    // For now, we'll use the browser's print dialog with save as PDF
    window.print();
  };
  const handleAddRoom = () => {
    setIsAddRoomModalOpen(true);
    setNewRoomName('');
  };
  const handleCreateRoom = () => {
    if (newRoomName && newRoomName.trim()) {
      const trimmedName = newRoomName.trim();
      if (!roomOptions.includes(trimmedName)) {
        setRoomOptions([...roomOptions, trimmedName]);
        setSelectedRoom(trimmedName);
        setIsAddRoomModalOpen(false);
        setNewRoomName('');
      } else {
        alert('This room already exists!');
      }
    }
  };
  const handleRemoveRoom = (roomToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (roomOptions.length === 1) {
      alert('You must have at least one room!');
      return;
    }
    const updatedRooms = roomOptions.filter(room => room !== roomToRemove);
    setRoomOptions(updatedRooms);
    if (selectedRoom === roomToRemove) {
      setSelectedRoom(updatedRooms[0]);
    }
  };
  const handleDeleteProject = (projectId: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== projectId));
    }
  };
  const handleCreateNewProject = () => {
    if (newProjectName && newProjectName.trim()) {
      const newProject = {
        id: `proj${Date.now()}`,
        name: newProjectName.trim(),
        thumbnail: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop&auto=format',
        lastModified: new Date(),
        roomType: newProjectRoomType,
        itemCount: 0
      };
      setProjects([newProject, ...projects]);
      setIsNewProjectModalOpen(false);
      setNewProjectName('');
      setNewProjectRoomType('Living Room');
    }
  };
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };
  const handleItemDragStart = (item: TreeItem, e: React.DragEvent) => {
    if (!item.imageUrl) return;

    // Create drag preview
    setDragPreview({
      imageUrl: item.imageUrl,
      label: item.label,
      x: e.clientX,
      y: e.clientY
    });

    // Set drag data
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/plain', JSON.stringify(item));

    // Hide default drag image
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(img, 0, 0);
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (dragPreview) {
      setDragPreview(prev => prev ? {
        ...prev,
        x: e.clientX,
        y: e.clientY
      } : null);
    }
  };
  const handleDragEnd = () => {
    setDragPreview(null);
  };
  const handleDropOnCanvas = (e: React.DragEvent) => {
    e.preventDefault();
    setDragPreview(null);
    try {
      const data = e.dataTransfer.getData('text/plain');
      const item = JSON.parse(data);
      console.log('Dropped item on canvas:', item);
      // Here you would add the 3D model to the scene
    } catch (error) {
      console.error('Error parsing dropped data:', error);
    }
  };

  // @return
  return <div className="min-h-screen flex flex-col font-sans bg-white text-gray-900" onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
      {/* Header - Twitter Style */}
      <header className="px-4 py-3 flex items-center justify-between bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <button onClick={onNavigateHome} className="text-2xl font-bold text-[#1DA1F2] hover:opacity-80 transition-opacity">Interium</button>
          <nav className="hidden md:flex items-center gap-6 text-[15px] font-medium">
            {/* <button onClick={onNavigateHome} className="text-gray-600 hover:text-[#1DA1F2] transition-colors py-2">Home</button> */}
            <a href="#" className="text-gray-900 hover:text-[#1DA1F2] transition-colors py-2">Stage</a>
            <button onClick={onNavigateBlog} className="text-gray-600 hover:text-[#1DA1F2] transition-colors py-2">Blog</button>
            <button onClick={onNavigateContact} className="text-gray-600 hover:text-[#1DA1F2] transition-colors py-2">Contact</button>
          </nav>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:block">
          <h1 className="text-xl font-bold text-gray-900">Design Your Space</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Search className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <Search className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <div className="relative">
            <button onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)} className="w-9 h-9 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:bg-[#1a8cd8] transition-colors">
              <User className="w-5 h-5" />
            </button>
            
            {isAccountMenuOpen && <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                <div className="p-3 border-b border-gray-200">
                  <p className="font-semibold text-gray-900">{accountConfig.profile.fullName}</p>
                  <p className="text-sm text-gray-600">{accountConfig.profile.email}</p>
                </div>
                <button onClick={() => {
              setIsAccountConfigOpen(true);
              setIsAccountMenuOpen(false);
            }} className="w-full px-4 py-2.5 text-left text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-3">
                  <Settings className="w-4 h-4" />
                  Account Settings
                </button>
                <button onClick={() => {
              setIsMyProjectsOpen(true);
              setIsAccountMenuOpen(false);
            }} className="w-full px-4 py-2.5 text-left text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-3">
                  <Camera className="w-4 h-4" />
                  My Projects
                </button>
                <div className="border-t border-gray-200">
                  <button className="w-full px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-gray-50 transition-colors flex items-center gap-3">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>}
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <AnimatePresence>
        {isSearchOpen && <motion.div initial={{
        height: 0,
        opacity: 0
      }} animate={{
        height: 'auto',
        opacity: 1
      }} exit={{
        height: 0,
        opacity: 0
      }} transition={{
        duration: 0.2
      }} className="bg-white border-b border-gray-200 overflow-hidden sticky top-[57px] z-40">
            <div className="px-4 py-3 flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search for furniture, designs, or projects..." className="flex-1 outline-none text-[15px] text-gray-900 placeholder-gray-500" autoFocus />
              {searchQuery && <button onClick={() => setSearchQuery('')} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-4 h-4 text-gray-600" />
                </button>}
              <button onClick={() => {
            setIsSearchOpen(false);
            setSearchQuery('');
          }} className="px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                Cancel
              </button>
            </div>
          </motion.div>}
      </AnimatePresence>

      {/* Main Application Area */}
      <div className="flex-1 flex flex-col lg:flex-row bg-white min-h-[600px]">
        
        {/* Left Sidebar - Library */}
        <aside className="w-full lg:w-71 border-r border-gray-200 bg-white flex flex-col shrink-0">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">3D Library</h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            {treeData.map(item => <SidebarItem key={item.id} item={item} onToggle={toggleNode} onItemDragStart={handleItemDragStart} />)}
          </div>
        </aside>

        {/* Center - 3D Stage */}
        <main className="flex-1 relative bg-gray-50 flex flex-col h-[600px] lg:h-auto overflow-hidden">
          {/* Toolbar */}
          <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-start pointer-events-none">
            <div className="flex items-center gap-2 pointer-events-auto">
              <div className="relative">
                <div className="bg-white border border-gray-300 rounded-full px-4 py-2 text-sm flex items-center gap-3 min-w-[160px] justify-between shadow-sm cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <span className="font-medium text-gray-900">{selectedRoom}</span>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </div>
                {isDropdownOpen && <div className="absolute top-full mt-1 left-0 w-full bg-white border border-gray-300 rounded-xl shadow-lg overflow-hidden">
                    {roomOptions.map(room => <div key={room} className="px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 cursor-pointer transition-colors flex items-center justify-between group" onClick={() => {
                  setSelectedRoom(room);
                  setIsDropdownOpen(false);
                }}>
                        <span>{room}</span>
                        <button onClick={e => handleRemoveRoom(room, e)} className="p-1 hover:bg-red-100 rounded-full transition-colors opacity-0 group-hover:opacity-100" title="Remove room">
                          <X className="w-4 h-4 text-red-600" />
                        </button>
                      </div>)}
                  </div>}
              </div>
              <button className="w-9 h-9 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-100 shadow-sm transition-colors" onClick={handleAddRoom}>
                <Plus className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="flex items-center gap-3 pointer-events-auto">
              <button className="bg-white border border-gray-300 rounded-full px-5 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50 transition-colors">
                Toggle Dimensions
              </button>
              <button className="bg-[#1DA1F2] text-white rounded-full px-5 py-2 text-sm font-bold shadow-sm hover:bg-[#1a8cd8] transition-colors" onClick={() => setIsImportOverlayOpen(true)}>
                Import 3D Model
              </button>
            </div>
          </div>

          {/* 3D Viewport */}
          <div className="w-full h-full bg-gray-50 cursor-grab active:cursor-grabbing" onDrop={handleDropOnCanvas} onDragOver={e => e.preventDefault()}>
            <Canvas 
              shadows 
              camera={{ position: [0.8, 1.5, -3.8], fov: 50 }}
              gl={{ 
                antialias: true,
                toneMapping: 2, // ACESFilmicToneMapping
                toneMappingExposure: 1.0,
                preserveDrawingBuffer: true
              }}
              style={{ width: '100%', height: '100%', cursor: 'inherit' }}
            >
              {/* Lighting Setup */}
              <ambientLight intensity={0.4} />
              <directionalLight 
                position={[5, 10, 5]} 
                intensity={1.5} 
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
              />
              <hemisphereLight intensity={0.3} groundColor="#444444" />
              
              {/* Environment for realistic reflections */}
              <Environment preset="studio" />
              
              {/* 3D Model */}
              <Room />
              
              {/* Ground Shadows */}
              <ContactShadows 
                position={[0, 0, 0]} 
                opacity={0.5} 
                scale={10} 
                blur={2} 
                far={4} 
              />
              
              {/* Camera Controls */}
              <OrbitControls 
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minDistance={1}
                maxDistance={15}
                target={[0, 0, 0]}
              />
            </Canvas>

          </div>

          {/* Bottom Right Button */}
          <div className="absolute bottom-6 right-6 z-10">
            <button onClick={() => setIsInvoiceOpen(true)} className="bg-white border border-gray-300 rounded-full px-6 py-2.5 text-sm font-bold text-gray-900 shadow-md hover:bg-gray-50 transition-colors">
              View Invoice
            </button>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer onNavigateAbout={onNavigateAbout} onNavigateTutorials={onNavigateTutorials} />

      {/* Import 3D Model Overlay */}
      {isImportOverlayOpen && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Import 3D Model</h2>
              <button onClick={() => setIsImportOverlayOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-6">
                Upload your 3D model files. Supported formats: OBJ, FBX, GLTF, GLB
              </p>

              {/* Drag & Drop Area */}
              <div className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${dragActive ? 'border-[#1DA1F2] bg-[#1DA1F2]/5' : 'border-gray-300 hover:border-gray-400'}`} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-gray-400" />
                  </div>
                  
                  <div>
                    <p className="text-base font-semibold text-gray-900 mb-1">
                      Drag and drop your 3D model here
                    </p>
                    <p className="text-sm text-gray-500">or click to browse files</p>
                  </div>

                  <label className="bg-[#1DA1F2] text-white rounded-full px-6 py-2.5 text-sm font-bold shadow-sm hover:bg-[#1a8cd8] transition-colors cursor-pointer">
                    Browse Files
                    <input type="file" className="hidden" accept=".obj,.fbx,.gltf,.glb" onChange={handleFileSelect} />
                  </label>
                </div>
              </div>

              {/* Supported Formats */}
              <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
                {['OBJ', 'FBX', 'GLTF', 'GLB'].map(format => <div key={format} className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-semibold text-gray-600">
                    {format}
                  </div>)}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => setIsImportOverlayOpen(false)} className="px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-full transition-colors">
                Cancel
              </button>
            </div>
          </motion.div>
        </div>}

      {/* Invoice Modal - (keeping the rest of the modals unchanged for brevity) */}
      <AnimatePresence>
        {isInvoiceOpen && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div initial={{
          opacity: 0,
          scale: 0.95
        }} animate={{
          opacity: 1,
          scale: 1
        }} exit={{
          opacity: 0,
          scale: 0.95
        }} className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between print:hidden">
                <h2 className="text-xl font-bold text-gray-900">Invoice</h2>
                <div className="flex items-center gap-2">
                  <button onClick={handlePrintInvoice} className="p-2 hover:bg-gray-100 rounded-full transition-colors" title="Print Invoice">
                    <Printer className="w-5 h-5 text-gray-600" />
                  </button>
                  <button onClick={handleDownloadPDF} className="p-2 hover:bg-gray-100 rounded-full transition-colors" title="Download PDF">
                    <Download className="w-5 h-5 text-gray-600" />
                  </button>
                  <button onClick={() => setIsInvoiceOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Invoice Content */}
              <div ref={invoiceRef} className="flex-1 overflow-y-auto p-6 print:p-8">
                {/* Invoice Header */}
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Interium Design Invoice</h1>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Invoice Date:</p>
                      <p className="font-medium text-gray-900">{new Date().toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Invoice #:</p>
                      <p className="font-medium text-gray-900">INV-{Date.now().toString().slice(-8)}</p>
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">Bill To:</h3>
                  <p className="text-sm text-gray-900 font-medium">{accountConfig.profile.fullName}</p>
                  <p className="text-sm text-gray-600">{accountConfig.profile.email}</p>
                </div>

                {/* Items Table */}
                <div className="mb-8">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">Design Items</h3>
                  
                  {invoiceItems.length === 0 ? <div className="text-center py-12 text-gray-500">
                      <p>No items in invoice</p>
                    </div> : <div className="space-y-3">
                      {invoiceItems.map(item => <motion.div key={item.id} initial={{
                  opacity: 1
                }} exit={{
                  opacity: 0,
                  x: -20
                }} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors print:hover:bg-white">
                          {item.imageUrl && <div className="w-16 h-16 shrink-0 rounded-md overflow-hidden bg-gray-100 border border-gray-100">
                              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                            </div>}
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">{item.category}</p>
                          </div>
                          
                          <div className="flex items-center gap-4 print:gap-2">
                            <div className="flex items-center gap-2 print:hidden">
                              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                                <span className="text-lg font-bold text-gray-600">−</span>
                              </button>
                              <span className="w-8 text-center font-medium text-gray-900">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                                <span className="text-lg font-bold text-gray-600">+</span>
                              </button>
                            </div>
                            
                            <div className="hidden print:block text-sm text-gray-900">
                              Qty: {item.quantity}
                            </div>
                            
                            <div className="text-right min-w-[100px]">
                              <p className="text-sm text-gray-600">@ ${item.price.toFixed(2)}</p>
                              <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            
                            <button onClick={() => removeInvoiceItem(item.id)} className="p-2 hover:bg-red-50 rounded-full transition-colors text-red-600 print:hidden" title="Remove item">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>)}
                    </div>}
                </div>

                {/* Totals */}
                {invoiceItems.length > 0 && <div className="border-t-2 border-gray-300 pt-4">
                    <div className="space-y-2 max-w-sm ml-auto">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-medium text-gray-900">${calculateSubtotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tax (8%):</span>
                        <span className="font-medium text-gray-900">${calculateTax().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold border-t pt-2">
                        <span className="text-gray-900">Total:</span>
                        <span className="text-[#1DA1F2]">${calculateTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>}

                {/* Footer Notes */}
                <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-600">
                  <p className="font-medium mb-1">Notes:</p>
                  <p>Thank you for choosing Interium 3D Designer. All prices are in USD. Please contact us if you have any questions about this invoice.</p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center print:hidden">
                <p className="text-sm text-gray-600">
                  {invoiceItems.length} {invoiceItems.length === 1 ? 'item' : 'items'}
                </p>
                <div className="flex gap-3">
                  <button onClick={() => setIsInvoiceOpen(false)} className="px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-full transition-colors">
                    Close
                  </button>
                  <button onClick={handleDownloadPDF} className="px-5 py-2 text-sm font-bold bg-[#1DA1F2] text-white rounded-full hover:bg-[#1a8cd8] transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                </div>
              </div>
            </motion.div>
          </div>}
      </AnimatePresence>

      {/* Account Configuration Modal - Keeping remaining modals as-is */}
      {isAccountConfigOpen && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
              <button onClick={() => setIsAccountConfigOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar Tabs */}
              <div className="w-56 border-r border-gray-200 bg-gray-50 p-4 space-y-1">
                {configTabs.map(tab => {
              const Icon = tab.icon;
              return <button key={tab.id} onClick={() => setActiveConfigTab(tab.id)} className={`relative w-full px-4 py-3 rounded-lg text-left text-sm font-medium transition-colors flex items-center gap-3 ${activeConfigTab === tab.id ? 'bg-[#1DA1F2] text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>;
            })}
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-6">
                
                {/* Profile Tab */}
                {activeConfigTab === 'profile' && <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Profile Information</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                          <input type="text" value={accountConfig.profile.fullName} onChange={e => updateAccountConfig('profile', 'fullName', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent" />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <input type="email" value={accountConfig.profile.email} onChange={e => updateAccountConfig('profile', 'email', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent" />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                          <input type="text" value={accountConfig.profile.username} onChange={e => updateAccountConfig('profile', 'username', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent" />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                          <textarea value={accountConfig.profile.bio} onChange={e => updateAccountConfig('profile', 'bio', e.target.value)} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent resize-none" />
                        </div>
                      </div>
                    </div>
                  </div>}

                {/* Preferences Tab */}
                {activeConfigTab === 'preferences' && <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Application Preferences</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                          <div className="flex gap-3">
                            {['light', 'dark'].map(theme => <button key={theme} onClick={() => updateAccountConfig('preferences', 'theme', theme)} className={`relative w-11 h-6 rounded-full transition-colors ${accountConfig.preferences.theme === theme ? 'bg-[#1DA1F2]' : 'bg-gray-300'}`}>
                                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${accountConfig.preferences.theme === theme ? 'translate-x-5' : 'translate-x-0'}`} />
                              </button>)}
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                          <select value={accountConfig.preferences.language} onChange={e => updateAccountConfig('preferences', 'language', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent">
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                            <option>Chinese</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Units</label>
                          <select value={accountConfig.preferences.units} onChange={e => updateAccountConfig('preferences', 'units', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent">
                            <option>Metric</option>
                            <option>Imperial</option>
                          </select>
                        </div>
                        
                        <div className="flex items-center justify-between py-3 border-t border-gray-200">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Grid Snap</p>
                            <p className="text-xs text-gray-500">Snap objects to grid</p>
                          </div>
                          <button onClick={() => updateAccountConfig('preferences', 'gridSnap', !accountConfig.preferences.gridSnap)} className={`relative w-11 h-6 rounded-full transition-colors ${accountConfig.preferences.gridSnap ? 'bg-[#1DA1F2]' : 'bg-gray-300'}`}>
                            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${accountConfig.preferences.gridSnap ? 'translate-x-5' : 'translate-x-0'}`} />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between py-3 border-t border-gray-200">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Auto Save</p>
                            <p className="text-xs text-gray-500">Automatically save your work</p>
                          </div>
                          <button onClick={() => updateAccountConfig('preferences', 'autoSave', !accountConfig.preferences.autoSave)} className={`relative w-11 h-6 rounded-full transition-colors ${accountConfig.preferences.autoSave ? 'bg-[#1DA1F2]' : 'bg-gray-300'}`}>
                            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${accountConfig.preferences.autoSave ? 'translate-x-5' : 'translate-x-0'}`} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>}

                {/* Notifications Tab */}
                {activeConfigTab === 'notifications' && <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Notification Preferences</h3>
                      
                      <div className="space-y-1">
                        <div className="flex items-center justify-between py-4 border-b border-gray-200">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                            <p className="text-xs text-gray-500">Receive notifications via email</p>
                          </div>
                          <button onClick={() => updateAccountConfig('notifications', 'emailNotifications', !accountConfig.notifications.emailNotifications)} className={`relative w-11 h-6 rounded-full transition-colors ${accountConfig.notifications.emailNotifications ? 'bg-[#1DA1F2]' : 'bg-gray-300'}`}>
                            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${accountConfig.notifications.emailNotifications ? 'translate-x-5' : 'translate-x-0'}`} />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between py-4 border-b border-gray-200">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Push Notifications</p>
                            <p className="text-xs text-gray-500">Receive push notifications</p>
                          </div>
                          <button onClick={() => updateAccountConfig('notifications', 'pushNotifications', !accountConfig.notifications.pushNotifications)} className={`relative w-11 h-6 rounded-full transition-colors ${accountConfig.notifications.pushNotifications ? 'bg-[#1DA1F2]' : 'bg-gray-300'}`}>
                            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${accountConfig.notifications.pushNotifications ? 'translate-x-5' : 'translate-x-0'}`} />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between py-4 border-b border-gray-200">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Project Updates</p>
                            <p className="text-xs text-gray-500">Get notified about project changes</p>
                          </div>
                          <button onClick={() => updateAccountConfig('notifications', 'projectUpdates', !accountConfig.notifications.projectUpdates)} className={`relative w-11 h-6 rounded-full transition-colors ${accountConfig.notifications.projectUpdates ? 'bg-[#1DA1F2]' : 'bg-gray-300'}`}>
                            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${accountConfig.notifications.projectUpdates ? 'translate-x-5' : 'translate-x-0'}`} />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between py-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Newsletter</p>
                            <p className="text-xs text-gray-500">Receive our weekly newsletter</p>
                          </div>
                          <button onClick={() => updateAccountConfig('notifications', 'newsletter', !accountConfig.notifications.newsletter)} className={`relative w-11 h-6 rounded-full transition-colors ${accountConfig.notifications.newsletter ? 'bg-[#1DA1F2]' : 'bg-gray-300'}`}>
                            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${accountConfig.notifications.newsletter ? 'translate-x-5' : 'translate-x-0'}`} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>}

                {/* Security Tab */}
                {activeConfigTab === 'security' && <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Security Settings</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between py-4 border-b border-gray-200">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                            <p className="text-xs text-gray-500">Add an extra layer of security</p>
                          </div>
                          <button onClick={() => updateAccountConfig('security', 'twoFactorAuth', !accountConfig.security.twoFactorAuth)} className={`relative w-11 h-6 rounded-full transition-colors ${accountConfig.security.twoFactorAuth ? 'bg-[#1DA1F2]' : 'bg-gray-300'}`}>
                            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${accountConfig.security.twoFactorAuth ? 'translate-x-5' : 'translate-x-0'}`} />
                          </button>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout</label>
                          <select value={accountConfig.security.sessionTimeout} onChange={e => updateAccountConfig('security', 'sessionTimeout', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent">
                            <option value="15">15 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="60">1 hour</option>
                            <option value="120">2 hours</option>
                          </select>
                        </div>
                        
                        <div className="pt-4">
                          <button className="w-full px-4 py-3 bg-gray-100 text-gray-900 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                            Change Password
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>}

                {/* Billing Tab */}
                {activeConfigTab === 'billing' && <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Billing & Subscription</h3>
                      
                      <div className="space-y-4">
                        <div className="p-4 bg-[#1DA1F2]/10 border border-[#1DA1F2] rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-gray-900">Pro Plan</h4>
                            <span className="text-sm font-semibold text-[#1DA1F2]">Active</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">$29.99/month</p>
                          <p className="text-xs text-gray-500">Next billing date: January 15, 2024</p>
                        </div>
                        
                        <div className="pt-4 space-y-3">
                          <button className="w-full px-4 py-3 bg-gray-100 text-gray-900 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                            Manage Subscription
                          </button>
                          <button className="w-full px-4 py-3 bg-gray-100 text-gray-900 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                            Update Payment Method
                          </button>
                          <button className="w-full px-4 py-3 bg-gray-100 text-gray-900 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                            Download Invoices
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => setIsAccountConfigOpen(false)} className="px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-full transition-colors">
                Cancel
              </button>
              <button onClick={handleSaveAccountConfig} className="px-5 py-2 text-sm font-bold bg-[#1DA1F2] text-white rounded-full hover:bg-[#1a8cd8] transition-colors flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>}

      {/* Add Room Modal */}
      {isAddRoomModalOpen && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Add New Room</h2>
              <button onClick={() => setIsAddRoomModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">
                Enter a name for your new room design
              </p>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room Name</label>
                <input type="text" value={newRoomName} onChange={e => setNewRoomName(e.target.value)} onKeyDown={e => {
              if (e.key === 'Enter') {
                handleCreateRoom();
              }
            }} placeholder="e.g., Kitchen, Bathroom, Office" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent" autoFocus />
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => setIsAddRoomModalOpen(false)} className="px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-full transition-colors">
                Cancel
              </button>
              <button onClick={handleCreateRoom} className="px-5 py-2 text-sm font-bold bg-[#1DA1F2] text-white rounded-full hover:bg-[#1a8cd8] transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Room
              </button>
            </div>
          </motion.div>
        </div>}

      {/* My Projects Modal */}
      {isMyProjectsOpen && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">My Projects</h2>
                <p className="text-sm text-gray-600 mt-1">{projects.length} {projects.length === 1 ? 'project' : 'projects'}</p>
              </div>
              <button onClick={() => setIsMyProjectsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {projects.length === 0 ? <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <Camera className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">No projects yet</h3>
                  <p className="text-sm text-gray-600 mb-6">Start designing your first room to create a project</p>
                  <button className="px-6 py-2.5 bg-[#1DA1F2] text-white rounded-full font-bold hover:bg-[#1a8cd8] transition-colors">
                    Create New Project
                  </button>
                </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map(project => <motion.div key={project.id} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                      {/* Thumbnail */}
                      <div className="relative aspect-video bg-gray-100 overflow-hidden">
                        <img src={project.thumbnail} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        {/* Hover Actions */}
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleDeleteProject(project.id)} className="p-2 bg-white/90 hover:bg-white rounded-full transition-colors shadow-lg" title="Delete project">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>

                      {/* Project Info */}
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 mb-1 truncate">{project.name}</h3>
                        <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
                          <span className="px-2 py-1 bg-[#1DA1F2]/10 text-[#1DA1F2] rounded-full font-medium">
                            {project.roomType}
                          </span>
                          <span>•</span>
                          <span>{project.itemCount} items</span>
                        </div>
                        
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <p className="text-xs text-gray-500">
                            Modified {formatDate(project.lastModified)}
                          </p>
                          <button className="text-xs font-medium text-[#1DA1F2] hover:underline">
                            Open
                          </button>
                        </div>
                      </div>
                    </motion.div>)}
                </div>}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
              <button className="px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-full transition-colors">
                Export All
              </button>
              <div className="flex gap-3">
                <button onClick={() => setIsMyProjectsOpen(false)} className="px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-full transition-colors">
                  Close
                </button>
                <button onClick={() => setIsNewProjectModalOpen(true)} className="px-5 py-2 text-sm font-bold bg-[#1DA1F2] text-white rounded-full hover:bg-[#1a8cd8] transition-colors flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  New Project
                </button>
              </div>
            </div>
          </motion.div>
        </div>}

      {/* New Project Modal */}
      {isNewProjectModalOpen && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Create New Project</h2>
              <button onClick={() => setIsNewProjectModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5">
              <p className="text-sm text-gray-600">
                Start a new interior design project
              </p>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                <input type="text" value={newProjectName} onChange={e => setNewProjectName(e.target.value)} onKeyDown={e => {
              if (e.key === 'Enter') {
                handleCreateNewProject();
              }
            }} placeholder="e.g., Modern Living Room Design" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent" autoFocus />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
                <select value={newProjectRoomType} onChange={e => setNewProjectRoomType(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent">
                  {roomOptions.map(room => <option key={room} value={room}>{room}</option>)}
                </select>
              </div>

              <div className="p-4 bg-[#1DA1F2]/10 border border-[#1DA1F2]/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#1DA1F2] flex items-center justify-center shrink-0 mt-0.5">
                    <Camera className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">Quick Tip</p>
                    <p className="text-xs text-gray-600">Choose a descriptive name to easily find your project later. You can always rename it from the project settings.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => setIsNewProjectModalOpen(false)} className="px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-full transition-colors">
                Cancel
              </button>
              <button onClick={handleCreateNewProject} disabled={!newProjectName.trim()} className="px-5 py-2 text-sm font-bold bg-[#1DA1F2] text-white rounded-full hover:bg-[#1a8cd8] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                <Plus className="w-4 h-4" />
                Create Project
              </button>
            </div>
          </motion.div>
        </div>}

      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print\\\\:block {
            display: block !important;
          }
          .print\\\\:hidden {
            display: none !important;
          }
          #invoice-content, #invoice-content * {
            visibility: visible;
          }
          #invoice-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>

      {/* Drag Preview */}
      {dragPreview && <div className="fixed pointer-events-none z-[9999]" style={{
      left: dragPreview.x,
      top: dragPreview.y,
      transform: 'translate(-50%, -50%)'
    }}>
          <motion.div initial={{
        opacity: 0,
        scale: 0.8
      }} animate={{
        opacity: 1,
        scale: 1
      }} className="bg-white rounded-lg shadow-2xl border-2 border-[#1DA1F2] p-2 w-32">
            <div className="aspect-square rounded-md overflow-hidden bg-gray-100 mb-2">
              <img src={dragPreview.imageUrl} alt={dragPreview.label} className="w-full h-full object-cover" />
            </div>
            <p className="text-xs font-medium text-gray-900 text-center truncate">
              {dragPreview.label}
            </p>
          </motion.div>
        </div>}
    </div>;
};