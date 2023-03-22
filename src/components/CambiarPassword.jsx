function CambiarPassword({ show, onConfirm, onCancel }) {
  if (!show) {
    return null;
  }

  return (
    <div>
      <div>
        <form htmlFor="newPassword1">Nueva contraseña</form>
        <input type="text" name="newPassword1" />
        <br />
        <form htmlFor="newPassword2">Repite la nueva contraseña</form>
        <input type="text" name="newPassword2" />
        <br />
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "10px",
            marginTop: "30px",
            marginBottom: "30px"
          }}>
        <button onClick={onConfirm}>Confirmar</button>
        <button onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default CambiarPassword;
