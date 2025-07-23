'use client';

import React, { useState} from "react";
import { Heart, Share2, Bookmark, MessageCircle, MoreHorizontal, Copy, Twitter, Facebook, Linkedin, Code, Flag, Plus, Download, FileText } from "lucide-react";

export default function VideoActionIcons() {

  const [isLiked, setIsLiked] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(1247);
  const [saveCount, setSaveCount] = useState(89);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    setSaveCount(prev => isSaved ? prev - 1 : prev + 1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this video',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const formatCount = (count) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareMenu(false);
  };

  return (<div className="w-full max-w-4xl bg-card text-card-foreground flex flex-col gap-6 rounded-xl col-span-1 lg:col-span-6 py-0">
      {/* Desktop Action Bar */}
      <div className="hidden sm:flex items-center justify-between bg-white border rounded-lg py-2 px-2 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="group relative">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-md border transition-all duration-200 cursor-not-allowed ${
                isLiked 
                  ? 'bg-red-500 text-white border-red-500 hover:bg-red-600' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
              onClick={handleLike}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              <span className="hidden md:inline">Like</span>
              <span className="text-sm font-medium">{formatCount(likeCount)}</span>
            </button>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {isLiked ? 'Unlike this video' : 'Like this video'}
            </div>
          </div>

          <div className="relative">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-50 transition-all duration-200 cursor-not-allowed"
              onClick={() => setShowShareMenu(!showShareMenu)}
            >
              <Share2 className="h-4 w-4" />
              <span className="hidden md:inline">Share</span>
            </button>
            
            {showShareMenu && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border w-48 z-10">
                <div className="py-1">
                  <button onClick={copyLink} className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-sm cursor-not-allowed">
                    <Copy className="h-4 w-4" />
                    Copy link
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-sm cursor-not-allowed">
                    <Twitter className="h-4 w-4" />
                    Share to Twitter
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-sm cursor-not-allowed">
                    <Facebook className="h-4 w-4" />
                    Share to Facebook
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-sm cursor-not-allowed">
                    <Linkedin className="h-4 w-4" />
                    Share to LinkedIn
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-sm cursor-not-allowed">
                    <Code className="h-4 w-4" />
                    Embed video
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="group relative">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-md border transition-all duration-200 cursor-not-allowed ${
                isSaved 
                  ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
              onClick={handleSave}
            >
              <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
              <span className="hidden md:inline">Save</span>
              <span className="text-sm font-medium">{formatCount(saveCount)}</span>
            </button>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {isSaved ? 'Remove from saved' : 'Save for later'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-50 transition-all duration-200 cursor-not-allowed">
            <MessageCircle className="h-4 w-4" />
            <span className="hidden lg:inline">Comments</span>
            <span className="text-sm font-medium">42</span>
          </button>

          <div className="relative">
            <button
              className="p-2 rounded-md hover:bg-gray-100 transition-all duration-200 cursor-not-allowed"
              onClick={() => setShowMoreMenu(!showMoreMenu)}
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
            
            {showMoreMenu && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border w-48 z-10">
                <div className="py-1">
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-sm cursor-not-allowed">
                    <Flag className="h-4 w-4" />
                    Report video
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-sm cursor-not-allowed">
                    <Plus className="h-4 w-4" />
                    Add to playlist
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-sm cursor-not-allowed">
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-sm cursor-not-allowed">
                    <FileText className="h-4 w-4" />
                    Show transcript
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Action Bar */}
      <div className="sm:hidden flex items-center justify-between bg-white border rounded-lg p-3 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            className={`flex items-center gap-2 transition-all duration-200 ${isLiked ? 'text-red-500' : 'text-gray-600'}`}
            onClick={handleLike}
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">{formatCount(likeCount)}</span>
          </button>

          <button className="flex items-center gap-2 text-gray-600">
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm font-medium">42</span>
          </button>

          <button
            className={`flex items-center gap-2 transition-all duration-200 ${isSaved ? 'text-blue-500' : 'text-gray-600'}`}
            onClick={handleSave}
          >
            <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">{formatCount(saveCount)}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            onClick={handleShare}
          >
            <Share2 className="h-5 w-5" />
          </button>

          <div className="relative">
            <button
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
              onClick={() => setShowMoreMenu(!showMoreMenu)}
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>
            
            {showMoreMenu && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border w-44 z-10">
                <div className="py-1">
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-sm">
                    <Flag className="h-4 w-4" />
                    Report video
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-sm">
                    <Plus className="h-4 w-4" />
                    Add to playlist
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-sm">
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close menus */}
      {(showShareMenu || showMoreMenu) && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => {
            setShowShareMenu(false);
            setShowMoreMenu(false);
          }}
        />
      )}
    </div>
  );
}
