const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const UploadFieldSection = (props: any) => {
    const { handleSubmit, selectedFile, setSelectedFile, setErrorMessage, errorMessage } = props;


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            // Validar tipo de archivo
            const allowedTypes = [".pdf", ".odt", ".docx"];
            const fileType = file.name.split(".").pop()?.toLowerCase();

            if (!allowedTypes.includes(`.${fileType}`)) {
                setErrorMessage("Formato de archivo no permitido. Solo .pdf, .odt, .docx");
                setSelectedFile(null);
                return;
            }

            // Validar tamaño del archivo
            if (file.size > MAX_FILE_SIZE) {
                setErrorMessage("El archivo excede el tamaño máximo de 5MB.");
                setSelectedFile(null);
                return;
            }

            // Si pasa las validaciones, actualizar el estado
            setSelectedFile(file);
            setErrorMessage(null);
        }
    };

    return <><div>
        Sube tu aporte
    </div>
        <div className="mt-4">
            <input
                type="file"
                accept=".pdf,.odt,.docx"
                onChange={handleFileChange}
            />
            {errorMessage && (
                <p className="text-red-500 mt-2">{errorMessage}</p>
            )}
        </div>
        {selectedFile && (
            <div className="border p-4 mt-4 w-full max-w-md">
                <p className="text-black">
                    <strong>Archivo seleccionado:</strong> {selectedFile.name}
                </p>
                <p className="text-black">
                    <strong>Tamaño:</strong> {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
            </div>
        )}
        <button
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
            onClick={handleSubmit}
        >
            Enviar
        </button>
    </>
}