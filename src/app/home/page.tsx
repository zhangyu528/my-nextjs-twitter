'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Post {
  id: number;
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  content: string;
  timestamp: string;
  image?: string;
  likes: number;
  comments: number;
  retweets: number;
  type: 'recommend' | 'follow';
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'recommend' | 'follow'>('recommend');
  const [activeMenuItem, setActiveMenuItem] = useState('首页');

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      type: 'recommend',
      author: {
        name: '技术达人',
        username: '@tech_expert',
        avatar: 'https://ui-avatars.com/api/?name=Tech&background=0D8ABC&color=fff'
      },
      content: '刚刚学习了最新的React Hooks技巧，真的太酷了！🚀 #技术分享',
      timestamp: '2小时前',
      image: 'https://picsum.photos/seed/tech/600/400',
      likes: 42,
      comments: 7,
      retweets: 12
    },
    {
      id: 2,
      type: 'recommend',
      author: {
        name: '旅行博主',
        username: '@travel_lover',
        avatar: 'https://ui-avatars.com/api/?name=Travel&background=5A5A5A&color=fff'
      },
      content: '在这美丽的地方度过了最棒的一天！🌄 旅行的意义就是不断探索未知',
      timestamp: '1小时前',
      image: 'https://picsum.photos/seed/travel/600/400',
      likes: 89,
      comments: 15,
      retweets: 24
    },
    {
      id: 3,
      type: 'follow',
      author: {
        name: '好友小明',
        username: '@xiaoming',
        avatar: 'https://ui-avatars.com/api/?name=Ming&background=28a745&color=fff'
      },
      content: '今天和家人一起吃了顿大餐，好久没这么开心了！',
      timestamp: '30分钟前',
      image: 'https://picsum.photos/seed/family/600/400',
      likes: 15,
      comments: 3,
      retweets: 1
    }
  ]);

  const [newPostContent, setNewPostContent] = useState('');

  const handlePostSubmit = () => {
    if (newPostContent.trim() === '') return;

    const newPost: Post = {
      id: posts.length + 1,
      type: activeTab,
      author: {
        name: '当前用户',
        username: '@current_user',
        avatar: 'https://ui-avatars.com/api/?name=User&background=007bff&color=fff'
      },
      content: newPostContent,
      timestamp: '刚刚',
      likes: 0,
      comments: 0,
      retweets: 0
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
  };

  const menuItems = [
    { icon: '🏠', name: '首页', active: true },
    { icon: '🔍', name: '探索', active: false },
    { icon: '🔔', name: '通知', active: false },
    { icon: '✉️', name: '消息', active: false },
    { icon: '👤', name: '个人', active: false },
  ];

  const filteredPosts = posts.filter(post => post.type === activeTab);

  return (
    <div className="bg-black text-white min-h-screen flex overflow-hidden">
      {/* 左侧功能栏 固定不滚动 */}
      <div className="w-48 border-r border-gray-800 p-4 overflow-y-auto">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button 
              key={item.name}
              className={`
                w-full flex items-center space-x-3 p-3 rounded-full 
                ${activeMenuItem === item.name 
                  ? 'bg-blue-900/50 text-blue-400' 
                  : 'hover:bg-gray-800 text-white'}
              `}
              onClick={() => setActiveMenuItem(item.name)}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-lg">{item.name}</span>
            </button>
          ))}
          
          <button 
            className="w-full bg-blue-400 text-black p-3 rounded-full font-bold hover:bg-blue-300 mt-4"
          >
            发推
          </button>
        </div>
      </div>

      {/* 主内容区 可滚动 */}
      <div className="flex-1 max-w-xl mx-0 overflow-y-auto h-screen scrollbar-hide">
        {/* 顶部导航 sticky 固定 */}
        <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800 p-4 flex justify-between items-center">
          <div className="text-2xl font-bold">{activeMenuItem}</div>
          <div className="flex space-x-4">
            <button className="hover:bg-gray-800 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* 内容区域 可以完整滚动 */}
        <div className="pb-20 scrollbar-hide">
          {/* Tab区域 */}
          <div className="flex border-b border-gray-800">
            <button 
              className={`flex-1 py-3 text-center ${activeTab === 'recommend' ? 'text-white border-b-2 border-blue-400' : 'text-gray-500'}`}
              onClick={() => setActiveTab('recommend')}
            >
              推荐
            </button>
            <button 
              className={`flex-1 py-3 text-center ${activeTab === 'follow' ? 'text-white border-b-2 border-blue-400' : 'text-gray-500'}`}
              onClick={() => setActiveTab('follow')}
            >
              关注
            </button>
          </div>

          {/* 发布区域 */}
          <div className="border-b border-gray-800 p-4">
            <div className="flex space-x-4">
              <Image 
                src="https://ui-avatars.com/api/?name=User&background=007bff&color=fff&size=48" 
                alt="用户头像" 
                width={48} 
                height={48} 
                className="rounded-full object-cover"
                style={{ 
                  width: '48px', 
                  height: '48px', 
                  maxWidth: '48px', 
                  maxHeight: '48px' 
                }}
              />
              <div className="flex-1">
                <textarea 
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="有什么新鲜事？"
                  className="w-full bg-transparent border-none text-white placeholder-gray-500 resize-none focus:outline-none"
                  rows={3}
                />
                <div className="flex justify-end mt-2">
                  <button 
                    onClick={handlePostSubmit}
                    className="bg-blue-400 text-black px-4 py-2 rounded-full hover:bg-blue-300"
                  >
                    发布
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 帖子列表 */}
          <div>
            {filteredPosts.length === 0 ? (
              <div className="text-center text-gray-500 py-10">
                {activeTab === 'recommend' ? '暂无推荐内容' : '你还没有关注任何人'}
              </div>
            ) : (
              filteredPosts.map((post) => (
                <div key={post.id} className="border-b border-gray-800 p-4">
                  {/* 帖子详细内容 */}
                  <div className="flex space-x-4">
                    <Image 
                      src={post.author.avatar} 
                      alt={`${post.author.name}的头像`} 
                      width={48} 
                      height={48} 
                      className="rounded-full object-cover"
                      style={{ 
                        width: '48px', 
                        height: '48px', 
                        maxWidth: '48px', 
                        maxHeight: '48px' 
                      }}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-bold">{post.author.name}</span>
                          <span className="text-gray-500 ml-2">{post.author.username}</span>
                        </div>
                        <span className="text-gray-500">{post.timestamp}</span>
                      </div>
                      <p className="mt-2">{post.content}</p>
                      {post.image && (
                        <Image 
                          src={post.image} 
                          alt="帖子图片" 
                          width={600} 
                          height={400} 
                          className="rounded-lg mt-3 object-cover"
                        />
                      )}
                      <div className="flex justify-between text-gray-500 mt-3">
                        <button className="hover:text-blue-400 flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <span>{post.comments}</span>
                        </button>
                        <button className="hover:text-green-400 flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          <span>{post.retweets}</span>
                        </button>
                        <button className="hover:text-red-400 flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          <span>{post.likes}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 右侧边栏 */}
      <div className="w-80 border-l border-gray-800 p-4 overflow-y-auto h-screen scrollbar-hide">
        {/* 搜索区域 */}
        <div className="mb-4 relative">
          <input 
            type="text" 
            placeholder="搜索" 
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-full pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>

        {/* What's Happening 区域 */}
        <div className="bg-gray-900 rounded-lg mb-4 p-4">
          <h2 className="text-xl font-bold mb-4">What's Happening</h2>
          <div className="space-y-3">
            <div className="border-b border-gray-800 pb-3">
              <p className="text-gray-500 text-sm">技术 · trending</p>
              <p className="font-semibold">React 19 即将发布</p>
              <p className="text-gray-500 text-sm">1,234 posts</p>
            </div>
            <div className="border-b border-gray-800 pb-3">
              <p className="text-gray-500 text-sm">全球 · 热门</p>
              <p className="font-semibold">COP28气候大会</p>
              <p className="text-gray-500 text-sm">5,678 posts</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">娱乐 · 热议</p>
              <p className="font-semibold">新电影即将上映</p>
              <p className="text-gray-500 text-sm">2,345 posts</p>
            </div>
          </div>
        </div>

        {/* Who to Follow 区域 */}
        <div className="bg-gray-900 rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Who to Follow</h2>
          <div className="space-y-3">
            {[
              { name: '技术达人', username: '@tech_expert', avatar: 'https://ui-avatars.com/api/?name=Tech&background=0D8ABC&color=fff' },
              { name: '设计师', username: '@design_pro', avatar: 'https://ui-avatars.com/api/?name=Design&background=28a745&color=fff' },
              { name: '创业者', username: '@startup_guru', avatar: 'https://ui-avatars.com/api/?name=Startup&background=dc3545&color=fff' }
            ].map((user) => (
              <div key={user.username} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Image 
                    src={user.avatar} 
                    alt={`${user.name}的头像`} 
                    width={48} 
                    height={48} 
                    className="rounded-full object-cover"
                    style={{ 
                      width: '48px', 
                      height: '48px', 
                      maxWidth: '48px', 
                      maxHeight: '48px' 
                    }}
                  />
                  <div>
                    <p className="font-bold">{user.name}</p>
                    <p className="text-gray-500 text-sm">{user.username}</p>
                  </div>
                </div>
                <button className="bg-white text-black px-3 py-1 rounded-full text-sm font-bold hover:bg-gray-200">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 底部链接区域 */}
        <div className="text-xs text-gray-500 mt-4 text-center">
          <div className="space-x-2 mb-2">
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Cookie Policy</a>
            <a href="#" className="hover:underline">Accessibility</a>
            <a href="#" className="hover:underline">Ads Info</a>
            <a href="#" className="hover:underline">More...</a>
          </div>
          <div>
            &copy; {new Date().getFullYear()} All rights reserved
          </div>
        </div>
      </div>
    </div>
  );
}
