import qrcode
from qrcode.constants import ERROR_CORRECT_H

LINK = "https://belyn13301-ops.github.io/portfolio/"

qr = qrcode.QRCode(
    version=None,
    error_correction=ERROR_CORRECT_H,
    box_size=10,
    border=2,
)
qr.add_data(LINK)
qr.make(fit=True)

img = qr.make_image(fill_color="black", back_color="white")
img.save("qr-portfolio.png")
print(f"QR code saved -> qr-portfolio.png ({LINK})")
