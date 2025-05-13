import axios from 'axios';
import { ChangeEvent, useState, useRef, useEffect } from 'react';

// This part is related to sending data to the server
type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

interface SendResponse {
  filename: string;
  message: string;
}

// This part is related to fetching response from the server
interface Post {
  prediction: number;
  filename: string;
  // label: string;
}

export default function FileUploader() {
  // File upload states
  const [file, setFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);

  // Prediction states
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState<Post | null>(null);

  // AbortController for race conditions
  const abortControllerRef = useRef<AbortController | null>(null);

  // Handle file input change
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      
    // audio preview
    const file = e.target.files?.[0];
    setAudioUrl(URL.createObjectURL(file));
    // audio preview
    }
  };

  // Handle file upload and fetch prediction
  const handleFileUpload = async () => {
    if (!file) return;

    setStatus('uploading');
    setUploadProgress(0);
    setError(null);
    setPost(null); // Reset previous prediction results

  

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Step 1: Upload the file to the server
      const uploadResponse = await axios.post<SendResponse>(
        'http://127.0.0.1:5000/audio/api/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const progress = progressEvent.total
              ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
              : 0;
            setUploadProgress(progress);
          },
        }
      );

      setStatus('success');
      setUploadProgress(100);

      // Step 2: Fetch prediction results using the filename from the upload response
      const filename = uploadResponse.data.filename;
      await fetchPosts(filename);
    } catch (error) {
      setStatus('error');
      setUploadProgress(0);
      setError('File upload failed. Please try again.');
    }
  };

  // Fetch prediction results
  const fetchPosts = async (filename: string) => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/audio/api/predict/${filename}`,
        {
          method: 'GET',
          signal: abortControllerRef.current?.signal,
        }
      );

      if (!response.ok) {
        throw new Error(`Prediction failed! Status: ${response.status}`);
      }

      const data = (await response.json()) as Post;
      setPost(data);
    } catch (e: any) {
      if (e.name === 'AbortError') {
        console.log('Aborted');
        return;
      }
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <center>
      {/* The Box Wrapper that is holding the uploading */}
      <div className="home-section-container">
        <div className="audio-section-bottom">
          <div>
            <h1 className="primary-heading-audio" >Audio Analysis</h1>

            {/* The part that handles the Uploading */}
            <div className="space-y-2">
              <input
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="chooseFile"
              />
              <label htmlFor="chooseFile" className="chooseFile">
                Choose File
              </label>



              {/* audio preview */}
              <div style={{ textAlign: "center", marginTop: "20px" }}>
      
     
      {audioUrl && (
        <audio
          controls
          style={{
            marginTop: "20px",
            borderRadius: "10px", // Adds rounded corners to the audio player
            backgroundColor: "#f0f0f0", // Optional styling for aesthetics
          }}
        >
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
              {/* audio preview */}

              {file && (
                <div className="primary-text-audio">
                  <p>File name: {file.name}</p>
                  <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
                  <p>Type: {file.type}</p>
                </div>
              )}

              {status === 'uploading' && (
                <div className="space-y-2">
                  <div className="h-2.5 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2.5 rounded-full bg-blue-600 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">{uploadProgress}% uploaded</p>
                </div>
              )}

              {file && status !== 'uploading' && (
                <center>
                  <button
                    className="secondary-button-audio"
                    onClick={handleFileUpload}
                    style={{ alignSelf: 'center' }}
                  >
                    Upload
                  </button>
                </center>
              )}

              {status === 'success' && (
                <p className="primary-text-audio">File uploaded successfully!</p>
              )}

              {status === 'error' && (
                <p className="primary-text-audio">Upload failed. Please try again.</p>
              )}
            </div>
          </div>

          {/* Display the result in a new column next to the heading column */}
          <div className="display-result">
            {status === 'success' && (
              <div className="tutorial">
                <h1 className="primary-text-audio">Result of Analysis</h1>

                {isLoading && <div  style={{color: "white"}}>Loading...</div>}
                {!isLoading && post && (
                  <ul >
                    <p className='primary-text-audio'>Filename: {post.filename}</p>
                    {/* <p className='primary-text-audio'>Label: {post.label}</p> */}
                    <p className='primary-text-audio'>prediction: {post.prediction}</p>
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      </center>
    </>
  );
}