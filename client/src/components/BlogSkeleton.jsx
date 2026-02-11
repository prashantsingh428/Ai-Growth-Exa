import React from 'react';

const BlogSkeleton = () => {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm h-full">
                    {/* Image Skeleton */}
                    <div className="h-48 bg-slate-200 animate-pulse relative">
                        <div className="absolute top-4 right-4 w-20 h-6 bg-slate-300 rounded-full"></div>
                    </div>

                    {/* Content Skeleton */}
                    <div className="p-6 space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-4 bg-slate-200 rounded animate-pulse"></div>
                            <div className="w-20 h-4 bg-slate-200 rounded animate-pulse"></div>
                        </div>

                        <div className="space-y-2">
                            <div className="w-full h-6 bg-slate-200 rounded animate-pulse"></div>
                            <div className="w-3/4 h-6 bg-slate-200 rounded animate-pulse"></div>
                        </div>

                        <div className="space-y-2">
                            <div className="w-full h-4 bg-slate-100 rounded animate-pulse"></div>
                            <div className="w-full h-4 bg-slate-100 rounded animate-pulse"></div>
                            <div className="w-2/3 h-4 bg-slate-100 rounded animate-pulse"></div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                            <div className="w-24 h-5 bg-slate-200 rounded animate-pulse"></div>
                            <div className="w-8 h-8 bg-slate-200 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BlogSkeleton;
