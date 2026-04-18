using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema; 

namespace TodoApi;

[Table("items")] 
public partial class Item
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public bool IsComplete { get; set; }
}