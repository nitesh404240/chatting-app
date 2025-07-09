const SettingPanel = ({ open, onClose }) => {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-base-300 shadow-md p-6 transition-transform duration-300 z-50 ${
        open ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Settings</h2>
        <button onClick={onClose} className="text-red-500">Close</button>
      </div>
      <p></p>
    </div>
  )
}

export default SettingPanel
