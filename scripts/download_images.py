import urllib.request
import os

images = {
    "moto_package.png": "https://www.headblade.info/images/product_images/info_images/moto_package_nb_shadow_350x350.png",
    "moto_detail.gif": "https://www.headblade.info/images/product_images/info_images/moto_fire_shdw_350x350.gif",
    "atx_package.jpg": "https://www.headblade.info/images/product_images/popup_images/41o8o0bsfjl.jpg",
    "atx_pink.jpg": "https://www.headblade.info/images/product_images/popup_images/_12.jpg",
    "hb4_bag.png": "https://www.headblade.info/images/product_images/popup_images/HB4_bag_600X600_350x350.png",
    "hb6_bag.png": "https://www.headblade.info/images/product_images/popup_images/HB6_bag_600X600_350x350.png",
    "hb4_powerpack.jpg": "https://www.headblade.info/images/product_images/popup_images/hb4_powerpack_2013_350x350.jpg",
    "hb6_powerpack.jpg": "https://www.headblade.info/images/product_images/popup_images/hb6_powerpack_2013_350x350.jpg",
    "headslick_5oz.jpg": "https://www.headblade.info/images/product_images/popup_images/5oz-headslick-mentholated-shave-cream-5oz-214356.jpg",
    "headcase_04.png": "https://www.headblade.info/images/product_images/popup_images/headcase_04.png"
}

target_dir = "/Users/joelcherinodiaz/KI-System/02_Projects/active/headblade-germany-commerce/public/images/products"
os.makedirs(target_dir, exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'}

for filename, url in images.items():
    filepath = os.path.join(target_dir, filename)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as response, open(filepath, 'wb') as out_file:
            out_file.write(response.read())
        size = os.path.getsize(filepath)
        print(f"SUCCESS: {filename} ({size} bytes)")
    except Exception as e:
        print(f"FAILED: {filename} -> {e}")
