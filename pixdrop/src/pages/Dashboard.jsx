import { useEffect, useRef, useState } from "react"
import { supabase } from "../supabase/client"

const Dashboard = () => {
    const [user, setUser] = useState(null)
    const [uploadedUrls, setUploadedUrls] = useState([])
    const [isUploading, setIsUploading] = useState(false)
    const [previewUrl, setPreviewUrl] = useState(null)
    const [previewType, setPreviewType] = useState('image')

    const fileInputRef = useRef()

    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser()
            if (error) {
                console.error("Error fetching user:", error.message)
            } else {
                setUser(data.user)
                fetchGallery(data.user.id)
            }
        }

        fetchUser()
    }, [])

    const fetchGallery = async (userId) => {
        const { data, error } = await supabase
            .storage
            .from('pictures')
            .list(`${userId}`, {
                limit: 100,
                sortBy: { column: 'name', order: 'desc' },
            })

        if (error) {
            console.error("Error fetching gallery:", error.message)
        } else {
            const urls = await Promise.all(data.map(async (file) => {
                const { data: urlData } = await supabase
                    .storage
                    .from('pictures')
                    .createSignedUrl(`${userId}/${file.name}`, 3600)
                return {
                    name: file.name,
                    url: urlData?.signedUrl
                }
            }))
            setUploadedUrls(urls)
        }
    }

    const handleDrop = async (e) => {
        e.preventDefault()
        const droppedFiles = Array.from(e.dataTransfer.files)
        if (!user) return
        setIsUploading(true)

        for (const file of droppedFiles) {
            const filePath = `${user.id}/${file.name}`
            const { error } = await supabase
                .storage
                .from('pictures')
                .upload(filePath, file, { upsert: true })

            if (error) {
                console.error("Upload failed:", error.message)
            }
        }

        setIsUploading(false)
        fetchGallery(user.id)
    }

    const handleFileSelect = async (e) => {
        const selectedFiles = Array.from(e.target.files)
        if (!user) return
        setIsUploading(true)

        for (const file of selectedFiles) {
            const filePath = `${user.id}/${file.name}`
            const { error } = await supabase
                .storage
                .from('pictures')
                .upload(filePath, file, { upsert: true })

            if (error) {
                console.error("Upload failed:", error.message)
            }
        }

        setIsUploading(false)
        fetchGallery(user.id)
    }

    const handleDelete = async (fileName) => {
        if (!user) return
        if (!window.confirm(`Are you sure you want to delete "${fileName}"?`)) return

        const { error } = await supabase
            .storage
            .from('pictures')
            .remove([`${user.id}/${fileName}`])

        if (error) {
            console.error("Delete failed:", error.message)
        } else {
            setUploadedUrls(prev => prev.filter(file => file.name !== fileName))
        }
    }

    return (
        <>
            <div className="p-6 md:p-10 bg-gradient-to-br from-gray-100 via-white to-pink-200 min-h-screen">
                <div className="bg-pink-100 shadow-md rounded-xl px-6 py-4 mb-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-pink-800">📦 Media Vault</h1>
                    <button
                        onClick={() => supabase.auth.signOut()}
                        className="bg-pink-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition"
                    >
                        Logout
                    </button>
                </div>

                {user ? (
                    <>
                        <p className="text-lg text-gray-700 mb-6">
                            Welcome, <span className="font-semibold text-pink-900">{user.user_metadata?.full_name || user.email}</span>!
                        </p>

                        {/* Upload Area */}
                        <div
                            onDrop={handleDrop}
                            onDragOver={(e) => e.preventDefault()}
                            onClick={() => fileInputRef.current.click()}
                            className="border-2 border-dashed border-gray-300 rounded-xl bg-white/70 backdrop-blur-sm p-10 text-center text-gray-600 hover:border-pink-400 hover:bg-pink-50 transition duration-200 cursor-pointer"
                        >
                            {isUploading ? (
                                <span className="animate-pulse text-blue-600 font-medium">Uploading...</span>
                            ) : (
                                <span className="text-lg">📤 Drag and drop files or click to browse</span>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                onChange={handleFileSelect}
                                className="hidden"
                            />
                        </div>

                        {/* Gallery */}
                        <h2 className="mt-10 text-xl font-semibold text-gray-800 mb-3">📁 Uploaded Files</h2>
                        {uploadedUrls.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mt-2">
                                {uploadedUrls.map((file, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white rounded-xl shadow hover:shadow-lg transition p-5 border border-gray-200 relative"
                                    >
                                        {/* Delete Button */}
                                        <button
                                            onClick={() => handleDelete(file.name)}
                                            className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm font-bold"
                                            title="Delete"
                                        >
                                            ×
                                        </button>

                                        {/* Media Preview */}
                                        {file.url.match(/\.(mp4|webm|ogg)$/i) ? (
                                            <video
                                                src={file.url}
                                                controls
                                                onClick={() => {
                                                    setPreviewUrl(file.url)
                                                    setPreviewType('video')
                                                }}
                                                className="w-full h-40 object-cover rounded-lg cursor-pointer"
                                            />
                                        ) : (
                                            <img
                                                src={file.url}
                                                alt={`media-${idx}`}
                                                onClick={() => {
                                                    setPreviewUrl(file.url)
                                                    setPreviewType('image')
                                                }}
                                                className="w-full h-40 object-contain rounded-lg cursor-pointer"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm mt-4 italic">No media uploaded yet.</p>
                        )}
                    </>
                ) : (
                    <p className="text-gray-500">Loading user...</p>
                )}
            </div>

            {/* Modal Preview */}
            {previewUrl && (
                <div
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={() => setPreviewUrl(null)}
                >
                    <button
                        onClick={() => setPreviewUrl(null)}
                        className="absolute top-2 right-5 text-red-700 hover:text-white text-5xl"
                    >
                        &times;
                    </button>
                    <div
                        className="max-w-4xl max-h-[90vh] p-4 bg-white rounded-lg shadow-lg relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {previewType === 'video' ? (
                            <video src={previewUrl} controls className="max-h-[80vh] rounded" />
                        ) : (
                            <img src={previewUrl} alt="preview" className="max-h-[80vh] rounded" />
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default Dashboard
