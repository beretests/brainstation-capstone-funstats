import { Cloudinary } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dsspeyssh",
  },
});

const transformImage = (image, size) => {
  const parts = image.split("/");
  const lastTwoParts = parts.slice(-2).join("/");
  const publicId = lastTwoParts.split(".")[0];
  const myImage = cld
    .image(publicId)
    .resize(thumbnail().width(size).height(size))
    .roundCorners(byRadius(10));
  return myImage;
};

export default transformImage;
