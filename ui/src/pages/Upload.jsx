import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Upload() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newFile = {
          name: file.name,
          size: file.size,
          uploadDate: new Date(),
        };
        setFiles([...files, newFile]);
        setFile(null);

        toast.success(`${file.name} has been successfully uploaded.`);
      } catch (error) {
        toast.error("Upload failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <h1 className="text-4xl font-bold text-center text-gray-900">File Upload</h1>

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6">Upload File</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="file" className="block text-gray-700 text-sm font-bold mb-2">
                Select a file
              </label>
              <input id="file" type="file" onChange={handleFileChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={!file}>
              Upload
            </button>
          </form>
        </div>

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">My Files</h2>
          {files.length === 0 ? (
            <p className="text-center text-gray-500">No files uploaded yet.</p>
          ) : (
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li key={index} className="flex justify-between items-center p-2 bg-gray-100 rounded">
                  <span>{file.name}</span>
                  <span className="text-sm text-gray-500">
                    {(file.size / 1024).toFixed(2)} KB • {file.uploadDate.toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Upload;
