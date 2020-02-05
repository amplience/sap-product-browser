import { expect } from 'chai';
import { selectorFirstImageOfFormat } from '../../src/utils/selectorFirstImageOfFormat.js';
import { ImageContext } from '../../src/model/image-context';

describe('run image fetch tests',  () => {
  it('get first JPEG thumb nail image',  () => {
    var image : ImageContext | undefined = selectorFirstImageOfFormat(imageList, 'JPEG', 'THUMBNAIL');
    expect(image!.url).to.eq('8b31cf59-99a0-4079-a688-807cb1df2a4d');
  });

  it('get first PNG PRIMARY image',  () => {
    var image : ImageContext | undefined = selectorFirstImageOfFormat(imageList, 'PNG', 'PRIMARY');
    expect(image!.url).to.eq('5375030d-b7a4-45da-8a6e-d70eba1c8877');
  });

  it('get first MP3 PRIMARY image that doesnot exist will return undefined',  () => {
    var image : ImageContext | undefined = selectorFirstImageOfFormat(imageList, 'MP3', 'PRIMARY');
    expect(image).to.be.undefined;
  });

  it('get first PGN SIMPLES image that doesnot exist will return undefined',  () => {
    var image : ImageContext | undefined = selectorFirstImageOfFormat(imageList, 'PGN', 'SIMPLES');
    expect(image).to.be.undefined;
  })
});

const imageList:  ImageContext[] = [
  {
    format: 'PNG',
    imageType: 'PRIMARY',
    url: '5375030d-b7a4-45da-8a6e-d70eba1c8877'
  },
  {
    format: 'PNG',
    imageType: 'PRIMARY',
    url: 'f0f90839-a82a-4ac9-9c94-a10f02e82518'
  },
  {
    format: 'PNG',
    imageType: 'PRIMARY',
    url: 'e74ab7ad-2ecb-4cfd-a5c4-3fc4e85bff85'
  },
  {
    format: 'PNG',
    imageType: 'THUMBNAIL',
    url: '8a106c51-a19d-4c65-bf3e-022bd80f6c0a'
  },
  {
    format: 'JPEG',
    imageType: 'THUMBNAIL',
    url: '8b31cf59-99a0-4079-a688-807cb1df2a4d'
  },
  {
    format: 'JPEG',
    imageType: 'THUMBNAIL',
    url: 'ba49351e-877b-4e5e-a05d-4165c0534814'
  }
];
