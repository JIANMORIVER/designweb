
import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Upload, Save, Loader2 } from 'lucide-react';
import { compressImage } from '../contexts/ContentContext';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (value: string) => void;
  initialValue: string;
  type: 'text' | 'textarea' | 'image';
  label?: string;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onSave, initialValue, type, label }) => {
  const [value, setValue] = useState(initialValue);
  const [preview, setPreview] = useState(initialValue);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(type === 'image' ? preview : value);
    onClose();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      try {
        const compressedBase64 = await compressImage(file);
        setPreview(compressedBase64);
      } catch (error) {
        console.error("Image processing failed", error);
        alert("图片处理失败，请尝试其他图片");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
          <h3 className="font-bold text-gray-800">编辑 {label || '内容'}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        
        <div className="p-6">
          {type === 'text' && (
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              autoFocus
            />
          )}
          
          {type === 'textarea' && (
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              rows={6}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              autoFocus
            />
          )}

          {type === 'image' && (
            <div className="space-y-4">
              <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center group cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                   onClick={() => !isProcessing && fileInputRef.current?.click()}>
                {preview ? (
                  <img src={preview} alt="Preview" className={`w-full h-full object-cover ${isProcessing ? 'opacity-50' : ''}`} />
                ) : (
                  <div className="text-center text-gray-400">
                    <Upload size={32} className="mx-auto mb-2" />
                    <p>点击上传新图片</p>
                  </div>
                )}
                
                {isProcessing && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <Loader2 className="animate-spin text-blue-600" size={32} />
                  </div>
                )}

                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
                   {!isProcessing && (
                     <span className="bg-white/90 px-4 py-2 rounded-full shadow text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                       更换图片
                     </span>
                   )}
                </div>
              </div>
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="hidden" 
              />
              <p className="text-xs text-gray-500 text-center">支持 JPG, PNG, WEBP (会自动压缩以节省空间)</p>
            </div>
          )}
        </div>

        <div className="p-4 bg-gray-50 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg font-medium transition-colors">
            取消
          </button>
          <button 
            onClick={handleSave} 
            disabled={isProcessing}
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-600/20 ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            <Save size={18} />
            保存
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default EditModal;
