import React, { useEffect, useState } from 'react';
import { FiAlertTriangle, FiCheckCircle, FiClock, FiExternalLink, FiFile, FiLoader, FiTrash2, FiUploadCloud, FiSearch, FiRefreshCw, FiWifiOff } from 'react-icons/fi';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { DEMO_RECORDINGS } from '../../data/mockData';
import { Header } from '../Home/HomePage';

const TERMINAL_STATUSES = ['COMPLETE', 'COMPLETED', 'FAILED', 'PROCESSING_HALTED_UNSUITABLE_CONTENT', 'PROCESSING_HALTED_NO_SPEECH', 'SUMMARY_FAILED', 'COMPLETED_WITH_WARNINGS'];
const UPLOADING_STATUSES = ['UPLOAD_PENDING', 'UPLOAD_IN_PROGRESS', 'UPLOADING_TO_STORAGE', 'UPLOADED'];
const PROCESSING_STATUSES = [
  'PROCESSING_QUEUED',
  'TRANSCRIBING',
  'PDF_CONVERTING',
  'PDF_CONVERTING_API',
  'TRANSCRIPTION_COMPLETE',
  'PDF_CONVERSION_COMPLETE',
  'SUMMARIZATION_QUEUED',
  'SUMMARIZING',
  'SUMMARY_COMPLETE',
  'RECOMMENDATIONS_QUEUED',
  'GENERATING_RECOMMENDATIONS',
  'PROCESSING'
];
const UPLOAD_TIMEOUT_SECONDS = 10 * 60;

const RecordingList = () => {
    const [recordings, setRecordings] = useState([...DEMO_RECORDINGS]);
    const [filteredRecordings, setFilteredRecordings] = useState([...DEMO_RECORDINGS]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulate brief loading for demo
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 300);
        return () => clearTimeout(timer);
    }, []);

    // Update filtered recordings when search query or recordings change
    useEffect(() => {
        const lowerQuery = searchQuery.toLowerCase();
        const filtered = recordings.filter(rec => 
            (rec.title && rec.title.toLowerCase().includes(lowerQuery)) ||
            (rec.description && rec.description.toLowerCase().includes(lowerQuery))
        );
        setFilteredRecordings(filtered);
    }, [searchQuery, recordings]);

    const handleToggleFavorite = (recording) => {
        const newIsFavorite = !recording.isFavorite;
        setRecordings(prev => prev.map(rec => {
            if (rec.id === recording.id) {
                return { ...rec, isFavorite: newIsFavorite, favoriteCount: (rec.favoriteCount || 0) + (newIsFavorite ? 1 : -1) };
            }
            return rec;
        }));
    };

    const handleDelete = (idToDelete) => {
        if (!window.confirm('Are you sure you want to delete this recording? (Demo mode - resets on refresh)')) {
            return;
        }
        setRecordings(prev => prev.filter(rec => rec.id !== idToDelete));
    };

    const handleDeleteAllRecordings = () => {
        if (!window.confirm('Delete all recordings? (Demo mode - resets on refresh)')) {
            return;
        }
        setRecordings([]);
    };

    const formatDate = (timestamp) => {
        if (!timestamp?.seconds) return 'N/A';
        return new Date(timestamp.seconds * 1000).toLocaleDateString();
    };

    const getStatusBadge = (recording) => {
        const { status, failureReason, uploadTimestamp } = recording;
        const originalStatus = status;
        const statusUpper = status?.toUpperCase() ?? 'UNKNOWN';
        let bgColor = 'bg-gray-100';
        let textColor = 'text-gray-800';
        let Icon = FiClock;
        let displayStatus = 'Unknown';
        let isSpinning = false;
        let titleText = '';

        const isUploadingOrPending = UPLOADING_STATUSES.includes(statusUpper);
        const isProcessing = PROCESSING_STATUSES.includes(statusUpper);
        const elapsedSeconds = uploadTimestamp?.seconds
            ? (Date.now() / 1000) - uploadTimestamp.seconds
            : 0;
        const isTimedOutUploadDisplay = isUploadingOrPending && elapsedSeconds > UPLOAD_TIMEOUT_SECONDS;

        if (isTimedOutUploadDisplay) {
            bgColor = 'bg-gray-100';
            textColor = 'text-gray-700';
            Icon = FiClock;
            displayStatus = 'Processing Upload';
            isSpinning = false;
            titleText = `Upload received ${Math.round(elapsedSeconds / 60)} mins ago, processing initiated. Status: ${originalStatus}`;
        } else {
            if (TERMINAL_STATUSES.includes(statusUpper)) {
                if (statusUpper === 'COMPLETE' || statusUpper === 'COMPLETED') {
                    bgColor = 'bg-green-100';
                    textColor = 'text-green-800';
                    Icon = FiCheckCircle;
                    displayStatus = 'Completed';
                } else if (statusUpper === 'COMPLETED_WITH_WARNINGS') {
                    bgColor = 'bg-yellow-100';
                    textColor = 'text-yellow-800';
                    Icon = FiAlertTriangle;
                    displayStatus = 'Completed w/ Warn';
                } else {
                    bgColor = 'bg-red-100';
                    textColor = 'text-red-800';
                    Icon = FiAlertTriangle;
                    displayStatus = 'Failed';
                }
            } else if (isProcessing) {
                bgColor = 'bg-yellow-100';
                textColor = 'text-yellow-800';
                Icon = FiLoader;
                displayStatus = 'Processing';
                isSpinning = true;
            } else if (isUploadingOrPending) {
                bgColor = 'bg-blue-100';
                textColor = 'text-blue-800';
                Icon = FiUploadCloud;
                displayStatus = 'Uploading';
                isSpinning = true;
            } else {
                displayStatus = 'Unknown';
                if (statusUpper !== 'UNKNOWN') {
                    console.warn('[Badge] Unknown recording status received:', originalStatus);
                }
            }
            
            titleText = (displayStatus === 'Failed' && failureReason)
                ? `${displayStatus}: ${failureReason}`
                : displayStatus;
            if (displayStatus !== originalStatus && originalStatus) {
                titleText += ` (Backend: ${originalStatus})`;
            }
        }

        return (
            <span
                title={titleText}
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}
            >
                <Icon className={`mr-1 h-3 w-3 ${isSpinning ? 'animate-spin' : ''}`} />
                {displayStatus}
            </span>
        );
    };

    const groupRecordings = (recs) => {
        const groups = {
            'Today': [],
            'This Week': [],
            'This Month': [],
            'Older': []
        };

        const now = new Date();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const oneWeekAgo = new Date(todayStart);
        oneWeekAgo.setDate(todayStart.getDate() - 7);
        const oneMonthAgo = new Date(todayStart);
        oneMonthAgo.setMonth(todayStart.getMonth() - 1);

        recs.forEach(rec => {
            if (!rec.uploadTimestamp?.seconds) {
                groups['Older'].push(rec);
                return;
            }
            const date = new Date(rec.uploadTimestamp.seconds * 1000);
            
            if (date >= todayStart) {
                groups['Today'].push(rec);
            } else if (date >= oneWeekAgo) {
                groups['This Week'].push(rec);
            } else if (date >= oneMonthAgo) {
                groups['This Month'].push(rec);
            } else {
                groups['Older'].push(rec);
            }
        });

        return groups;
    };

    const groupedRecordings = groupRecordings(filteredRecordings);

    const handleRetry = () => {
        setRecordings([...DEMO_RECORDINGS]);
        setError(null);
    };

    return (
        <>
            <Header />
            <main className="flex-grow py-12 bg-gray-50 dark:bg-gray-900">
                <title>AudioScholar - My Recordings</title>
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">My Recordings</h1>
                        <div className="flex items-center gap-4 w-full md:w-auto">
                             <div className="relative w-full md:w-64">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiSearch className="text-gray-400" />
                                </span>
                                <input
                                    type="text"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                    placeholder="Search recordings..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {!loading && recordings.length > 0 && (
                                <button
                                    onClick={handleDeleteAllRecordings}
                                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition flex items-center whitespace-nowrap"
                                    title="Delete All Recordings"
                                >
                                    <FiTrash2 className="mr-2 h-4 w-4" />
                                    Delete All
                                </button>
                            )}
                        </div>
                    </div>

                    {loading && (
                        <div className="text-center py-10">
                            <FiLoader className="animate-spin h-8 w-8 mx-auto text-teal-600" />
                            <p className="mt-2 text-gray-600 dark:text-gray-300">Loading recordings...</p>
                        </div>
                    )}

                    {error && !loading && (
                         <div className="flex flex-col items-center justify-center py-16 px-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 max-w-lg mx-auto mt-8 animate-fade-in">
                            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-full mb-4 ring-8 ring-red-50/50 dark:ring-red-900/10">
                                <FiWifiOff className="w-8 h-8 text-red-500 dark:text-red-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">Unable to Load Recordings</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-8 text-center leading-relaxed">
                                {error === 'Network Error' ? 'Please check your internet connection and try again.' : error}
                            </p>
                            <button
                                onClick={handleRetry}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-all shadow-sm hover:shadow hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                            >
                                <FiRefreshCw className="w-4 h-4" /> Try Again
                            </button>
                        </div>
                    )}

                    {!loading && recordings.length === 0 && !error && (
                        <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <FiFile className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <p className="text-gray-600 dark:text-gray-300">You haven't uploaded any recordings yet.</p>
                            <Link to="/upload" className="mt-4 inline-block bg-[#2D8A8A] hover:bg-[#236b6b] text-white font-medium py-2 px-5 rounded-md transition">
                                Upload Your First Recording
                            </Link>
                        </div>
                    )}

                    {!loading && filteredRecordings.length === 0 && recordings.length > 0 && (
                         <div className="text-center py-10">
                            <p className="text-gray-600 dark:text-gray-300">No recordings found matching your search.</p>
                        </div>
                    )}

                    {!loading && filteredRecordings.length > 0 && (
                        <div className="space-y-8">
                            {Object.entries(groupedRecordings).map(([group, groupRecordings]) => (
                                groupRecordings.length > 0 && (
                                    <div key={group}>
                                        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4 ml-1">{group}</h2>
                                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                                            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                                {groupRecordings.map((recording) => (
                                                    <li key={recording.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150 ease-in-out">
                                                        <div className="flex items-center justify-between flex-wrap gap-4">
                                                            <div className="flex-1 min-w-0">
                                                                <Link to={`/recordings/${recording.id}`} className="text-lg font-semibold text-teal-700 hover:text-teal-900 dark:text-teal-400 dark:hover:text-teal-300 truncate block" title={recording.title}>
                                                                    {recording.title || 'Untitled Recording'}
                                                                </Link>
                                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Uploaded: {formatDate(recording.uploadTimestamp)}</p>
                                                            </div>
                                                            <div className="flex items-center space-x-4 flex-shrink-0">
                                                                {getStatusBadge(recording)}
                                                                <button
                                                                    onClick={() => handleToggleFavorite(recording)}
                                                                    className={`p-1 rounded-md transition flex items-center gap-1 ${recording.isFavorite ? 'text-red-500 hover:bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                                                    title={recording.isFavorite ? "Unfavorite" : "Favorite"}
                                                                >
                                                                    {recording.isFavorite ? <FaHeart className="h-4 w-4" /> : <FaRegHeart className="h-4 w-4" />}
                                                                    {recording.favoriteCount > 0 && <span className="text-xs font-medium">{recording.favoriteCount}</span>}
                                                                </button>
                                                                <Link to={`/recordings/${recording.id}`} className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium inline-flex items-center" title="View Details">
                                                                    View Details <FiExternalLink className="ml-1 h-3 w-3" />
                                                                </Link>
                                                                <button
                                                                    onClick={() => handleDelete(recording.id)}
                                                                    className="text-red-500 hover:text-red-700 p-1 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 transition"
                                                                    title="Delete Recording"
                                                                >
                                                                    <FiTrash2 className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};

export default RecordingList;