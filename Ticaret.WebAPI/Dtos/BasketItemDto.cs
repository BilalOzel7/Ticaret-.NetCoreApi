﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Ticaret.WebAPI.Dtos
{
    public class BasketItemDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string ProductName { get; set; }
        [Required]
        [Range(0.1,double.MaxValue,ErrorMessage ="Miktar Bilgisi izin verilen aralıkta olmalıdır.")]
        public int Quantity { get; set; }
        [Required]
        [Range(0.1, double.MaxValue, ErrorMessage = "Fiyat Bilgisi izin verilen aralıkta olmalıdır.")]
        public decimal Price { get; set; }
        [Required]
        public string PictureUrl { get; set; }
        [Required]
        public string Brand { get; set; }
        [Required]
        public string Type { get; set; }
    }
}
